﻿// Load the 'index' controller
const index = require('../controllers/index.server.controllers');


// Define the routes module' method
module.exports = function (app) {

    // Mount the 'index' controller's 'render' method
    app.get('/', index.render);
    //
    app.get('/backprop_function_classifier', index.functionClassifier);

    
    
};