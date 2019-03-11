const express = require('express');
const router = express.Router();
const Message = require('../models').Message;
const User = require('../models').User;


  ///////////////////
 /* READ MESSAGES */
///////////////////

router.get('/read_messages', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id'],
			where: { username: req.session.username }
		})
		const receivedMessages = await Message.findAll({
			attributes: ['id', 'content', 'createdAt', 'recip_id', 'sender_id'],
			where: { 
				recip_id: currentUser.dataValues.id,
				active: true
			}
		})
		// const receivedUsernames = []
		// for (let i = 0; i < receivedMessages.length; i++) {
		// 	const receivedNames = await User.findAll({
		// 		attributes: ['username'],
		// 		where: { id: receivedMessages[i].dataValues.sender_id }
		// 	})
		// 	receivedUsernames.push(receivedNames[i].dataValues.username)
		// }
		const sentMessages = await Message.findAll({
			attributes: ['id', 'content', 'createdAt', 'recip_id', 'sender_id'],
			where: { sender_id: currentUser.dataValues.id }
		})
		// const sentUsernames = []
		// for (let i = 0; i < sentMessages.length; i++) {
		// 	const sentNames = await User.findAll({
		// 		attributes: ['username'],
		// 		where: { id: sentMessages[i].dataValues.recip_id }
		// 	})
		// 	sentUsernames.push(sentNames[i].dataValues.username)
		// }
		res.json({
			status: 200,
			data: {
				sent: sentMessages,
				// sentUsernames: sentUsernames,
				received: receivedMessages,
				// receivedUsernames: receivedUsernames
			}
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

  ////////////////////
 /* SEND A MESSAGE */
////////////////////

router.post('/new_message/:recipient', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id'],
			where: { username: req.session.username }
		})
		const sendMessage = await Message.create({
			content: req.body.content,
			recip_id: req.params.recipient,
			sender_id: currentUser.dataValues.id,
			active: true
		})
		if (sendMessage.dataValues.recip_id == currentUser.dataValues.id) {
			res.json({
				status: 200,
				message: 'Load no access page.'
			})
		} else {
			res.json({
				status: 200,
				data: sendMessage
			})
		}
	} catch (err) {
		console.log(err)
		next(err)
	}
})

  //////////////////////////////////////
 /* REMOVE A MESSAGE FROM YOUR INBOX */
//////////////////////////////////////

router.put('/update_message_inactive/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id', 'username'],
			where: { username: req.session.username }
		})
		const messageToDeactivate = await Message.findOne({
			attributes: ['id', 'recip_id'],
			where: { id: req.params.id }
		})
		if (currentUser.dataValues.id == messageToDeactivate.dataValues.recip_id) {
			const messageToErase = await messageToDeactivate.updateAttributes({
				active: false
			})
			res.json({
				status: 200,
				message: 'Message removed from inbox.'
			})
		} else {
			res.json({
				status: 200,
				message: 'Load no access page.'
			})
		}
	} catch (err) {
		console.log(err)
		next(err)
	}
})

  /////////////////////
 /* ERASE A MESSAGE */
/////////////////////

router.delete('/destroy_message/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id', 'username'],
			where: { username: req.session.username }
		})
		const messageToErase = await Message.findOne({
			attributes: ['id', 'recip_id'],
			where: { id: req.params.id }
		})
		if (currentUser.dataValues.id == messageToErase.dataValues.recip_id) {
			const messageToErase = await Message.destroy({
				where: { id: req.params.id }
			})
			res.json({
				status: 200,
				message: 'Message erased.'
			})
		} else {
			res.json({
				status: 200,
				message: 'Load no access page.'
			})
		}
	} catch (err) {
		console.log(err)
		next(err)
	}
})

module.exports = router;