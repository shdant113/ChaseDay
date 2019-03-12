const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('../models').User;

  //////////////////
 /* REGISTRATION */
//////////////////

router.post('/register', async (req, res, next) => {
	const hashPassword = bcrypt.hashSync(req.body.password, 12);
	try {
		const user = await User.create({
			username: req.body.username,
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: hashPassword,
			location: req.body.location
		})
		req.session.logged = true;
		req.session.username = user.username;
		req.session.password = user.password;
		res.json({
			status: 200,
			data: {
				user: user,
				message: `${user.username} created successfully.`
			}
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

  ///////////////
 ///* LOGIN *///
///////////////

router.post('/login', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			where: { username: req.body.username }
		})
		if (currentUser == null) {
			res.json({
				status: 404,
				data: 'Your username or password is incorrect.'
			})
		} else {
			if (bcrypt.compareSync(req.body.password, currentUser.password)) {
				req.session._id = currentUser._id;
				req.session.username = currentUser.username;
				req.session.logged = true;
				res.json({
					status: 200,
					data: {
						show: `Welcome back, ${req.session.username}.`,
						message: 'Login information correct'
					}
				})
			} else {
				res.json({
					status: 404,
					data: 'Your username or password is incorrect.'
				})
			}
		}
	} catch (err) {
		console.log(err)
		next(err)
	}
})

  //////////////
 //* LOGOUT *//
//////////////

router.get('/logout', async (req, res, next) => {
	try {
		req.session.destroy()
		res.json({
			status: 200,
			message: 'User is logged out.'
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

module.exports = router;