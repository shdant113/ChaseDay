const Sequelize = require('sequelize');
const sequelize = new Sequelize({
	database: 'chasedaydev',
	username: 'sdant',
	password: null,
	host: 'localhost',
	protocol: null,
	dialect: 'postgres',
	operatorsAliases: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})

sequelize.authenticate()
	.then(() => {
		console.log('yee sequelized bro')
	})
	.catch((err) => {
		console.log('fuck')
	})