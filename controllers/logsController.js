const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Log = require('../models').Log;
const Follow = require('../models').Follow;

  ///////////////////
 /* GET DASHBOARD */
///////////////////

/* THIS ROUTE IS BUGGED OUT
	it should work, but it doesn't for reasons myself and two others cannot seem to figure out */
router.get('/dashboard', async (req, res, next) => {
	const currentUser = await User.findOne({
		username: req.session.username
	})
	console.log(currentUser.dataValues.id)
	const date = new Date(Date.now());
	const time = date.getTime();
	const ninetyDaysTime = time - (90 * 24 * 60 * 60 * 1000);
	const ninetyDaysAgo = date.setUTCDate(ninetyDaysTime);
	const allLogs = [];
	const logsToShow = [];
	if (currentUser != null) {
		try {
			console.log("")
			const followedUsers = await Follow.findAll({
				attributes: ['id'],
				where: { userId: currentUser.dataValues.id }
			})
			if (followedUsers.length > 0) {
				const sevenDaysTime = time - (7 * 24 * 60 * 60 * 1000);
				const sevenDaysAgo = date.setUTCDate(sevenDaysTime);
				const logsByUser = [];
				const logsByFollowedUsers = await Log.findAll({
					attributes: ['id', 'createdAt'],
					where: { userId: followedUsers.dataValues.id }
				})
				if (logsByFollowedUsers.length > 0) {
					logsByUser.push(logsByFollowedUsers)
				}
				if (logsByUser.length > 0) {
					for (let i = 0; i < logsByUser.length; i++) {
						console.log(logsByUser[i])
						if (logsByUser[i].dataValues.createdAt > sevenDaysAgo) {
							logsToShow.push(logsByUser[i])
						}
					}
				}
				const otherLogs = await Log.findAll({
					attributes: ['id', 'createdAt']
				});
				if (otherLogs.length > 0) {
					allLogs.push(otherLogs)
				}
				if (allLogs.length > 0) {
					for (let i = 0; i < allLogs.length; i++) {
						if (allLogs[i].dataValues.createdAt > ninetyDaysAgo) {
							logsToShow.push(allLogs[i])
						}
					}
				}
				res.json({
					status: 200,
					data: logsToShow
				})
			} else {
				const newLogs = await Log.findAll({
					attributes: ['createdAt']
				});
				if (newLogs.length > 0) {
					allLogs.push(newLogs);
				}
				// console.log(allLogs[0].dataValues[0])
				console.log(allLogs)
				console.log(typeof allLogs[0].dataValues)
				if (allLogs.length > 0) {
					for (let i = 0; i < allLogs.length; i++) {
						if (allLogs[i].dataValues.createdAt > ninetyDaysAgo) {
							logsToShow.push(allLogs[i])
						}
					}
				}
				res.json({
					status: 200,
					data: logsToShow
				})
			}
		} catch (err) {
			console.log(err)
			next(err)
		}
	} else {
		try {
			const newLogs = await Log.findAll({
				attributes: ['id', 'createdAt']
			});
			allLogs.push(newLogs);
			if (logsByUser.length > 0) {
				for (let i = 0; i < allLogs.length; i++) {
					if (allLogs[i].dataValues.createdAt > ninetyDaysAgo) {
						logsToShow.push(allLogs[i])
					}
				}
			}
			res.json({
				status: 200,
				data: logsToShow
			})
		} catch (err) {
			console.log(err)
			next(err)
		}
	}
})

  /////////////////
 ///* NEW LOG *///
/////////////////

router.post('/new_log', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			username: req.session.username
		})
		const createLog = await Log.create({
			content: req.body.content,
			// date: req.body.date,
			// thumbnail: req.body.thumbnail
		})
		await res.json({
			status: 200,
			data: {
				log: createLog,
				message: `new log created by ${createLog.user_id}.`
			}
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

  //////////////////
 ///* EDIT LOG *///
//////////////////

router.get('/edit_log/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			username: req.session.username
		})
		const getLog = await Log.findOne({
			id: req.params.id
		})
		console.log("\n here is getLog from edit_log/:id, :id was " + req.params.id)
		console.log(getLog)
		res.json({
			status: 200,
			data: getLog
		})
	} catch (err) {
		console.log("\n there was an error")
		console.log(err)
		next(err)
	}
})

router.put('/update_log', async (req, res, next) => {
	try {
		const logToUpdate = await Log.findOne({
			attributes: ['id', 'content', 'date', 'thumbnail'],
			where: { id: req.params.id }
		})
		console.log(logToUpdate)
		const updateLog = await logToUpdate.updateAttributes({
			content: req.body.content,
			date: req.body.date,
			thumbnail: req.body.thumbnail
		})
		res.json({
			status: 200,
			data: updateLog,
			message: `Updated log ${updateLog.id}.`
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

module.exports = router;