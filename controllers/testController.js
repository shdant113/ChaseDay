const express = require('express');
const Test = require('../models').Test;
const fetch = require('node-fetch');
const router = express.Router();
const sequelize = require('sequelize');

router.get('/', async (req, res, next) => {
	try {
		const test = await Test.findOne()
		console.log(test)
		return test
	} catch (err) {
		console.log(err)
	}
})

router.post('/', async (req, res, next) => {
	try {
		const test = await Test.create({
			content: 'test'
		})
		console.log('test created', test)
		await test.save()
		return test
	} catch(err) {
		console.log(err)
	}
})

module.exports = router;