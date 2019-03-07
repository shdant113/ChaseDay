const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Log = require('../models').Log;
const Comment = require('../models').Comment;


  //////////////////////
 /* COMMENT ON A LOG */
//////////////////////

router.post('/new_comment/:logid', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id'],
			where: { username: req.session.username }
		})
		console.log(currentUser.dataValues.id)
		if (currentUser != null){
			const logComment = await Log.findOne({
				where: { id: req.params.logid }
			})
			const comment = await Comment.create({
				content: req.body.content,
				user_id: currentUser.dataValues.id,
				log_id: logComment.dataValues.id
			})
			res.json({
				status: 200,
				data: comment
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

  //////////////////////
 //* EDIT A COMMENT *//
//////////////////////

router.get('/edit_comment/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id', 'username'],
			where: { username: req.session.username }
		})
		const commentToEdit = await Comment.findOne({
			where: { id: req.params.id }
		})
		if (commentToEdit != null && currentUser.dataValues.username == req.session.username) {
			res.json({
				status: 200,
				data: commentToEdit
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

router.put('/update_comment/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id', 'username'],
			where: { username: req.session.username }
		})
		const commentToEdit = await Comment.findOne({
			attributes: ['content', 'id'],
			where: { id: req.params.id }
		})
		console.log(commentToEdit)
		if (commentToEdit != null && currentUser.dataValues.username == req.session.username) {
			const commentToUpdate = await commentToEdit.updateAttributes({
				content: req.body.content
			})
			res.json({
				status: 200,
				data: commentToUpdate
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

  ////////////////////////
 //* DELETE A COMMENT *//
////////////////////////

router.delete('/delete_comment/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id', 'username'],
			where: { username: req.session.username }
		})
		const commentToDelete = await Comment.findOne({
			where: { id: req.params.id }
		})
		if (currentUser.dataValues.id == commentToDelete.user_id) {
			await commentToDelete.destroy()
			res.json({
				status: 200,
				message: 'Comment erased.'
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