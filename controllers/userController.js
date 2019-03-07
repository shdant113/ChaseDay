const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('../models').User;


  //////////////////////
 /* ACCOUNT SETTINGS */
//////////////////////

router.get('/account_settings/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id', 'username', 'password', 'email'],
			where: { username: req.session.username }
		})
		console.log(currentUser)
		if (currentUser != null) {
			res.json({
				status: 200,
				data: currentUser
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

router.put('/update_settings/:id', async (req, res, next) => {
	try {
		const userToUpdate = await User.findOne({
			attributes: ['id', 'username', 'password', 'email'],
			where: { username: req.session.username }
		})
		console.log(userToUpdate.username)
		// const hashPassword = bcrypt.hashSync(req.body.password, 12);
		const updateUser = await userToUpdate.updateAttributes({
			username: req.body.username,
			email: req.body.email,
			// password: hashPassword
		})
		req.session.username = updateUser.username;
		req.session.password = updateUser.password;
		res.json({
			status: 200,
			data: updateUser,
			message: `Updated ${updateUser.username}.`
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

  //////////////////////
 /* PROFILE SETTINGS */
//////////////////////

router.get('/profile_settings/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id', 'firstName', 'lastName', 'location', 'facebook', 'twitter', 'youtube', 'signature'],
			where: { username: req.session.username }
		})
		res.json({
			status: 200,
			data: currentUser
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

router.put('/update_profile_settings/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id', 'firstName', 'lastName', 'location', 'facebook', 'twitter', 'youtube', 'signature'],
			where: { username: req.session.username }
		})
		const updateUser = await currentUser.updateAttributes({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			location: req.body.location,
			facebook: req.body.facebook,
			twitter: req.body.twitter,
			youtube: req.body.youtube,
			signature: req.body.signature
		})
		res.json({
			status: 200,
			data: updateUser,
			message: `Updated ${updateUser.username}.`
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

  //////////////////
 ///* EDIT BIO *///
//////////////////

router.get('/profile_settings/bio/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id', 'bio'],
			where: { username: req.session.username }
		})
		res.json({
			status: 200,
			data: currentUser
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

router.put('/update_profile_settings/bio/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			attributes: ['id', 'bio'],
			where: { username: req.session.username }
		})
		const updateUser = await currentUser.updateAttributes({
			bio: req.body.bio
		})
		res.json({
			status: 200,
			data: updateUser,
			message: `Updated ${updateUser.username}.`
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})


// edit profile photo, cover photo
	// probably gonna need multer, do this when there is more time
// update


module.exports = router;