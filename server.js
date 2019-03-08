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
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

// requirements
const sequelize = require('sequelize');
const models = require('./models');

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


// controllers
const testController = require('./controllers/testController');
const authController = require('./controllers/authController');
const logsController = require('./controllers/logsController');
const userController = require('./controllers/userController');
const ratingsController = require('./controllers/ratingsController');
const commentsController = require('./controllers/commentsController');
const followsController = require('./controllers/followsController');
const messageController = require('./controllers/messageController');
server.use('/api/v1/chaseDay/messages', messageController);
server.use('/api/v1/chaseDay/follows', followsController);
server.use('/api/v1/chaseDay/comments', commentsController);
server.use('/api/v1/chaseDay/ratings', ratingsController);
server.use('/api/v1/chaseDay/user', userController);
server.use('/api/v1/chaseDay/logs', logsController);
server.use('/api/v1/chaseDay/auth', authController);
server.use('/api/v1/test', testController);


const PORT = process.env.PORT || 3000

models.sequelize.sync().then(() => {
	server.listen(PORT, () => {
		const date = new Date(Date.now())
		const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' })
		console.log(date);
		console.log('Today is ' + dayOfWeek);
		console.log(`get to da choppa`)
		console.log(`da choppa is on port ${PORT}`)
	})
})