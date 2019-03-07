const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Log = require('../models').Log;
const Follow = require('../models').Follow;


  ///////////////////
 /* GET DASHBOARD */
///////////////////

router.get('/dashboard', async (req, res, next) => {
	const currentUser = await User.findOne({
		where: { username: req.session.username }
	})
	console.log(currentUser.dataValues.id)
	const date = new Date(Date.now());
	const time = date.getTime();
	const ninetyDaysTime = time - (90 * 24 * 60 * 60 * 1000);
	const ninetyDaysAgo = date.setUTCDate(ninetyDaysTime);
	if (currentUser != null) {
		try {
			console.log("")
			const followedUsers = await Follow.findAll({
				attributes: ['id'],
				where: { user_id: currentUser.dataValues.id }
			})
			// console.log(followedUsers)
			if (followedUsers.length > 0) {
				const sevenDaysTime = time - (7 * 24 * 60 * 60 * 1000);
				const sevenDaysAgo = date.setUTCDate(sevenDaysTime);
				const logsToShow = [];
				const logsByUsers = await Log.findAll({
					attributes: ['id', 'createdAt', 'user_id'],
					where: { user_id: followedUsers.dataValues.id }
				})
				if (logsByUsers.length > 0) {
					for (let i = 0; i < logsByUsers.length; i++) {
						console.log(logsByUsers[i])
						if (logsByUsers[i].dataValues.createdAt > sevenDaysAgo) {
							logsToShow.push(logsByUser[i])
						}
					}
				}
				const otherLogs = await Log.findAll({
					attributes: ['id', 'createdAt', 'user_id']
				});
				if (otherLogs.length > 0) {
					for (let i = 0; i < otherLogs.length; i++) {
						if (otherLogs[i].dataValues.createdAt > ninetyDaysAgo) {
							logsToShow.push(otherLogs[i])
						}
					}
				}
				res.json({
					status: 200,
					data: logsToShow
				})
			} else {
				const newLogs = await Log.findAll({
					attributes: ['id', 'createdAt', 'content', 'user_id']
				});
				if (newLogs.length > 0) {
					for (let i = 0; i < newLogs.length; i++) {
						if (newLogs[i].dataValues.createdAt < ninetyDaysAgo) {
							newLogs.splice(i, 1)
						}
					}
				}
				res.json({
					status: 200,
					data: newLogs
				})
			}
		} catch (err) {
			console.log(err)
			next(err)
		}
	} else {
		try {
			const newLogs = await Log.findAll({
				attributes: ['id', 'createdAt', 'content', 'user_id']
			});
			if (newLogs.length > 0) {
				for (let i = 0; i < newLogs.length; i++) {
					if (newLogs[i].dataValues.createdAt < ninetyDaysAgo) {
						newLogs.splice(i, 1)
					}
				}
			}
			res.json({
				status: 200,
				data: newLogs
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
			where: { username: req.session.username }
		})
		const createLog = await Log.create({
			content: req.body.content,
			date: req.body.date,
			thumbnail: req.body.thumbnail,
			user_id: currentUser.dataValues.id
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
			where: { username: req.session.username }
		})
		console.log(currentUser.username)
		const getLog = await Log.findOne({
			where: { id: req.params.id }
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

router.put('/update_log/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			where: { username: req.session.username }
		})
		const logToUpdate = await Log.findOne({
			attributes: ['id', 'content', 'date', 'thumbnail'],
			where: { id: req.params.id, user_id: currentUser.dataValues.id }
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

  ////////////////////
 ///* REMOVE LOG *///
////////////////////

router.put('/log_remove/:id', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			where: { username: req.session.username }
		})
		const logToRemove = await Log.findOne({
			attributes: ['id', 'active'],
			where: { id: req.params.id, user_id: currentUser.dataValues.id }
		})
		const removeLog = await logToRemove.updateAttributes({
			active: false
		})
		res.json({
			status: 200,
			data: removeLog,
			message: `Removed log ${removeLog.id} from ${currentUser.username}'s profile.`
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})


module.exports = router;