const express = require('express');
const router = express.Router();
const Message = require('../models').Message;
const User = require('../models').User;

router.get('/read_messages', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id'],
			where: { username: req.session.username }
		})
		console.log(currentUser.dataValues.username)
		const receivedMessages = await Message.findAll({
			attributes: ['id', 'content', 'createdAt', 'recip_id', 'sender_id'],
			where: { recip_id: currentUser.dataValues.id }
		})
		const receivedUsernames = []
		for (let i = 0; i < receivedMessages.length; i++) {
			const receivedNames = await User.findAll({
				attributes: ['username'],
				where: { id: receivedMessages[i].dataValues.sender_id }
			})
			receivedUsernames.push(receivedNames[i].dataValues.username)
		}
		const sentMessages = await Message.findAll({
			attributes: ['id', 'content', 'createdAt', 'recip_id', 'sender_id'],
			where: { sender_id: currentUser.dataValues.id }
		})
		const sentUsernames = []
		for (let i = 0; i < sentMessages.length; i++) {
			const sentNames = await User.findAll({
				attributes: ['username'],
				where: { id: sentMessages[i].dataValues.recip_id }
			})
			sentUsernames.push(sentNames[i].dataValues.username)
		}
		res.json({
			status: 200,
			data: {
				sent: sentMessages,
				sentUsernames: sentUsernames,
				received: receivedMessages,
				receivedUsernames: receivedUsernames
			}
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

router.post('/new_message/:recipient', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id'],
			where: { username: req.session.username }
		})
		console.log(currentUser.dataValues.username)
		const sendMessage = await Message.create({
			content: req.body.content,
			recip_id: req.params.recipient,
			sender_id: currentUser.dataValues.id
		})
		res.json({
			status: 200,
			data: sendMessage
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})



module.exports = router;