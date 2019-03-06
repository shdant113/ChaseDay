// database
require('./db');

// modules
const express = require('express');
const server = express();
const env = require('dotenv').config();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// middleware
server.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUnitialized: false,
	cookie: { 
		secure: false,
		maxAge: 1000*60*60*24*30 // 30 days
	}
}))
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));


const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
	const date = new Date(Date.now())
	const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' })
	console.log(date);
	console.log('Today is ' + dayOfWeek);
	console.log(`get to da choppa`)
	console.log(`da choppa is on port ${PORT}`)
})