const express = require('express');
const router = express.Router();
const Message = require('../models').Message;
const User = require('../models').User;

  ///////////////////////
 //* CHECK IF UNREAD *//
///////////////////////

router.get('/', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id'],
			where: { username: req.session.username }
		})
		const messages = await Message.findAll({
			where: { 
				recip_id: currentUser.dataValues.id,
				active: true
			}
		})
		res.json({
			status: 200,
			data: messages
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

  //////////////////////
 //* READ A MESSAGE *//
//////////////////////

router.get('/message/:id', async (req, res, next) => {
	try {
		const message = await Message.findOne({
			attributes: ['id', 'content', 'createdAt', 'sender_id', 'unread'],
			where: { id: req.params.id },
			include: [{
				model: User,
				as: 'author'
			}]
		})
		await message.update({
			unread: false
		})
		res.json({
			status: 200,
			data: message
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})


  //////////////////
 //* OPEN INBOX *//
//////////////////

router.get('/inbox/:userid', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id'],
			where: { id: req.params.userid }
		})
		const messages = await Message.findAll({
			 attributes: ['id', 'content', 'createdAt', 'recip_id', 'sender_id', 'unread'],
			 where: { 
			 	recip_id: currentUser.dataValues.id,
			 	active: true
			 },
			 include: [{
			 	model: User,
			 	as: 'author'
			 }]
		})
		const updateMessages = messages.map(message => {
			return message.updateAttributes({
				unread: false
			})
		})
		const inbox = await Promise.all(updateMessages)
		res.json({
			status: 200,
			data: inbox
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