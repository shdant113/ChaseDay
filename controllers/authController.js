const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const sequelize = require('sequelize');
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
			password: hashPassword
		})
		req.session.logged = true;
		req.session.username = user.username;
		req.session.password = user.password;
		await res.json({
			status: 200,
			data: {
				user: user,
				message: `${user.username} created successfully.`
			}
		})
	} catch (err) {
		console.log(err)
	}
})

module.exports = router;