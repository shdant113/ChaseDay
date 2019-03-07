const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Log = require('../models').Log;
const Follow = require('../models').Follow;

router.get('/dashboard', async (req, res, next) => {
	const currentUser = await User.findOne({
		username: req.session.username
	})
	const date = new Date(Date.now());
	const time = date.getTime();
	const ninetyDaysTime = time - (90 * 24 * 60 * 60 * 1000);
	const ninetyDaysAgo = date.setUTCDate(ninetyDaysTime);
	const allLogs = [];
	const logsToShow = [];
	if (currentUser != null) {
		try {
			const followedUsers = await Follow.findAll({
				where: { userId: currentUser._id }
			})
			if (followedUsers != null) {
				const date = new Date(Date.now());
				const time = date.getTime();
				const sevenDaysTime = time - (7 * 24 * 60 * 60 * 1000);
				const sevenDaysAgo = date.setUTCDate(sevenDaysTime);
				const logsByUser = [];
				const logsByFollowedUsers = await Logs.findAll({
					where: { 
						userId: followedUsers._id
					}
				})
				logsByUser.push(logsByFollowedUsers)
				for (let i = 0; i < logsByUser.length; i++) {
					if (logsByUser[i].createdAt > sevenDaysAgo) {
						logsToShow.push(logsByUser[i])
					} 
				}
				const otherLogs = await Logs.findAll();
				allLogs.push(otherLogs);
				for (let i = 0; i < allLogs.length; i++) {
					if (allLogs[i].createdAt > ninetyDaysAgo) {
						logsToShow.push(allLogs[i])
					}
				}
				res.json({
					status: 200,
					data: logsToShow
				})
			} else {
				const newLogs = await Logs.findAll();
				allLogs.push(newLogs);
				for (let i = 0; i < allLogs.length; i++) {
					if (allLogs[i].createdAt > ninetyDaysAgo) {
						logsToShow.push(allLogs[i])
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
			const newLogs = await Logs.findAll();
			allLogs.push(newLogs);
			for (let i = 0; i < allLogs.length; i++) {
				if (allLogs[i].createdAt > ninetyDaysAgo) {
					logsToShow.push(allLogs[i])
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

router.post('/new_log', async (req, res, next) => {
	try {
		const currentUser = await User.findOne({
			username: req.session.username
		})
		const createLog = await Log.create({
			content: req.body.content,
			date: req.body.date,
			thumbnail: req.body.thumbnail,
			userId: currentUser._id
		})
		await res.json({
			status: 200,
			data: {
				log: createLog,
				message: `new log created by ${createLog.userId}.`
			}
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
})

module.exports = router;