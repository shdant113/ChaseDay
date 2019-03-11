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
			attributes: ['id'],
			where: { username: req.session.username }
		})
		if (currentUser != null) {
			const log = await Log.findOne({
				attributes: ['id'],
				where: { id: req.params.logid },
				include: [{
					model: Rating
				}]
			})
			const rating = await Rating.create({
				type: req.body,
				log_id: log.dataValues.id
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