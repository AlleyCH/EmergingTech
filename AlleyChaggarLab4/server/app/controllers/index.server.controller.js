//
//https://github.com/PacktPublishing/Hands-on-Machine-Learning-with-TensorFlow.js/tree/master/Section5_4
//
const tf = require('@tensorflow/tfjs');
    //require('@tensorflow/tfjs-node');
    //load iris training and testing data
    const iris = require('../../iris.json');
    const irisTesting = require('../../iris-testing.json');
    var lossValue;
    //

exports.handlePredictionRequest = function (req, res) {
    // Extract form data from the request body
    const formData = req.body;

    // Extracting individual form fields
    const sepalLength = parseFloat(formData.sepalLength);
    const sepalWidth = parseFloat(formData.sepalWidth);
    const petalLength = parseFloat(formData.petalLength);
    const petalWidth = parseFloat(formData.petalWidth);
    const epochs = parseInt(formData.epochs);
    const learningRate = parseFloat(formData.learningRate);

    // Example: Prepare data for prediction (you may need to adjust this based on your model)
    const inputData = [[sepalLength, sepalWidth, petalLength, petalWidth]];

    // Example: Load pre-trained model (assuming you have a function to load the model)
    const model = loadModel(); // Load your model here

    // Example: Make prediction
    const prediction = model.predict(inputData);

    // Example: Format prediction results (adjust as per your model's output format)
    const predictionResult = prediction.dataSync();

    // Example: Send prediction results back to the client
    res.status(200).send({ prediction: predictionResult });
};
exports.trainAndPredict = function (req, res) {
    console.log(irisTesting)
    //
    // convert/setup our data for tensorflow.js
    //
    //tensor of features for training data
    // include only features, not the output
    const trainingData = tf.tensor2d(iris.map(item => [
        item.sepal_length, item.sepal_width, item.petal_length,
        item.petal_width
    ]))
    //console.log(trainingData.dataSync())
    //
    //tensor of output for training data
    //the values for species will be:
    // setosa:       1,0,0
    // virginica:    0,1,0
    // versicolor:   0,0,1

    const outputData = tf.tensor2d(iris.map(item => [
        item.species === "setosa" ? 1 : 0,
        item.species === "virginica" ? 1 : 0,
        item.species === "versicolor" ? 1 : 0
    ]))
    //
    //tensor of features for testing data
    const testingData = tf.tensor2d(irisTesting.map(item => [
        item.sepal_length, item.sepal_width,
        item.petal_length, item.petal_width,
    ]))
    //
    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [4], // four input neurons
        activation: "sigmoid",
        units: 5, //dimension of output space (first hidden layer)
    }))
    //add the hidden layer
    model.add(tf.layers.dense({
        inputShape: [5], //dimension of hidden layer
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(.06),
    })
    console.log(model.summary())
    //
    //Train the model and predict the results for testing data
    //
    // train/fit the model for the fixed number of epochs
    async function run() {
        const startTime = Date.now()
        //train the model
        await model.fit(trainingData, outputData,         
            {
                epochs: 100,
                callbacks: { //list of callbacks to be called during training
                    onEpochEnd: async (epoch, log) => {
                        lossValue = log.loss;
                        console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }
            
        )
            
        const results = model.predict(testingData);
        //console.log('prediction results: ', results.dataSync())
        //results.print()
        
        // get the values from the tf.Tensor
        //var tensorData = results.dataSync();
        results.array().then(array => {
            console.log(array[0][0])
            var resultForData1 = array[0];
            var resultForData2 = array[1];
            var resultForData3 = array[2];
            var dataToSent = {row1: resultForData1,row2: resultForData2, row3: resultForData3}
            console.log(resultForData1)
            // uncommment this when client is React
            res.status(200).send(dataToSent);
            //
            // comment this when client is React
            /*
            res.render('results',
                {
                    elapsedTime: elapsedTime / 1000,
                    lossValue: lossValue,
                    resultForData1: resultForData1[0],
                    resultForData2: resultForData2[0],
                    resultForData3: resultForData3[0]
                }
            )
            */
            
        })
    
    } //end of run function
    // call the run function
    run()

};

