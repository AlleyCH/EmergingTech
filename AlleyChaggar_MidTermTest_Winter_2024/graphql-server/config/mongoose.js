// Load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	return mongoose.connect('mongodb://localhost/AlleyChaggar-prompt-db', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
		.then((db) => {
			console.log('DB Connected!');
			require('../models/Prompt.model.server');
			return db; 	// Return the Mongoose connection instance
		})
		.catch(err => {
			console.log('Error');
			throw err;
		});
};