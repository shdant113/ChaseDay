const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Follow = require('../models').Follow;

  ///////////////////
 /* SEE FOLLOWING */
///////////////////

router.get('/following_users', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id'],
			where: { username: req.session.username }
		})
		const following = await Follow.findAll({
			attributes: ['id', 'follow_id'],
			where: { user_id: currentUser.dataValues.id }
		})
		console.log(following)
		const followsByName = []
		for (let i = 0; i < following.length; i++) {
			const followsNames = await User.findAll({
				attributes: ['username'],
				where: { id: following[i].dataValues.follow_id }
			})
			followsByName.push(followsNames[i].dataValues.username)
		}
		res.json({
			status: 200,
			data: followsByName
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

  ///////////////////
 /* SEE FOLLOWERS */
///////////////////

router.get('/followers', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id'],
			where: { username: req.session.username }
		})
		const followers = await Follow.findAll({
			attributes: ['id', 'user_id'],
			where: { follow_id: currentUser.dataValues.id }
		})
		const followersByName = []
		for (let i = 0; i < followers.length; i++) {
			const followersNames = await User.findAll({
				attributes: ['username'],
				where: { id: followers[i].dataValues.user_id }
			})
			followersByName.push(followersNames[i].dataValues.username)
		}
		console.log(followersByName)
		res.json({
			status: 200,
			data: followersByName
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

  ////////////////////
 /* FOLLOW SOMEONE */
////////////////////

router.post('/follow_user/:userid', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id'],
			where: { username: req.session.username }
		})
		const userToFollow = await User.findOne({
			attributes: ['username', 'id'],
			where: { id: req.params.userid }
		})
		const follow = await Follow.create({
			user_id: currentUser.dataValues.id,
			follow_id: userToFollow.dataValues.id
		})
		res.json({
			status: 200,
			data: follow
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

  //////////////////////
 /* UNFOLLOW SOMEONE */
//////////////////////

router.delete('/unfollow_user/:followid', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id'],
			where: { username: req.session.username }
		})
		const userToUnfollow = await Follow.destroy({
			where: { 
				follow_id: req.params.followid,
				user_id: currentUser.dataValues.id
			 }
		})
		res.json({
			status: 200,
			message: 'User unfollowed.'
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})



module.exports = router;