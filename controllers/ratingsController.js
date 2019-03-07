const express = require('express');
const router = express.Router();
const Rating = require('../models').Rating;
const User = require('../models').User;
const Log = require('../models').Log;

router.post('/rate/up/:logid/:userid', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			where: { username: req.session.username }
		})
		if (currentUser != null) {
			// apply the rating to the log
			const logRated = await Log.findOne({
				attributes: ['id'],
				where: { id: req.params.logid }
			})
			// apply the rating to the user
			const userRated = await User.findOne({
				attributes: ['id'],
				where: { id: req.params.userid }
			})
			// create the rating
			const rating = await Rating.create({
				type: 'up',
				log_id: logRated.dataValues.id,
				user_id: userRated.dataValues.id
			})
			res.json({
				status: 200,
				data: rating
			})
		}
	} catch (err) {
		console.log(err)
		next(err)
	}
})

module.exports = router;