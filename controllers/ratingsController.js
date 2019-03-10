const express = require('express');
const router = express.Router();
const Rating = require('../models').Rating;
const User = require('../models').User;
const Log = require('../models').Log;


  ////////////////
 /* RATE A LOG */
////////////////

router.post('/rate/:logid', async (req, res, next) => {
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
			// create the rating
			const rating = await Rating.create({
				type: req.body,
				log_id: logRated.dataValues.id
			})
			res.json({
				status: 200,
				data: rating
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