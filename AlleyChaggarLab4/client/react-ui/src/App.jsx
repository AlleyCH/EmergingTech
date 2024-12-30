import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    sepalLength: '',
    sepalWidth: '',
    petalLength: '',
    petalWidth: '',
    epochs: '',
    learningRate: ''
  });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "api/run";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(apiUrl);
        console.log('result.data:', result.data);
        setData(result.data);
        setShowLoading(false);
      } catch (error) {
        console.log('error in fetchData:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call with formData
      const result = await axios.post(apiUrl, formData);
      console.log('result.data:', result.data);
      setData(result.data);
    } catch (error) {
      console.log('error in handleSubmit:', error);
    }
  };

  // Function to determine species based on values
  const determineSpecies = (values) => {
    const threshold = 0.5; // You can adjust this threshold based on your specific scenario
    if (values[0] >= threshold && values[1] < threshold && values[2] < threshold) {
      return 'setosa';
    } else if (values[0] < threshold && values[1] >= threshold && values[2] < threshold) {
      return 'virginica';
    } else if (values[0] < threshold && values[1] < threshold && values[2] >= threshold) {
      return 'versicolor';
    } else {
      return 'Unknown'; // Add a default case or handle other scenarios as needed
    }
  };

  return (
    <div>
      {showLoading === false ? (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}

          {/* Form for entering new data */}
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Sepal Length:</label>
              <input type="text" name="sepalLength" value={formData.sepalLength} onChange={handleChange} placeholder="Enter sepal length" />
            </div>
            <div className="form-group">
              <label>Sepal Width:</label>
              <input type="text" name="sepalWidth" value={formData.sepalWidth} onChange={handleChange} placeholder="Enter sepal width" />
            </div>
            <div className="form-group">
              <label>Petal Length:</label>
              <input type="text" name="petalLength" value={formData.petalLength} onChange={handleChange} placeholder="Enter petal length" />
            </div>
            <div className="form-group">
              <label>Petal Width:</label>
              <input type="text" name="petalWidth" value={formData.petalWidth} onChange={handleChange} placeholder="Enter petal width" />
            </div>
            <div className="form-group">
              <label>Epochs:</label>
              <input type="text" name="epochs" value={formData.epochs} onChange={handleChange} placeholder="Enter number of epochs" />
            </div>
            <div className="form-group">
              <label>Learning Rate:</label>
              <input type="text" name="learningRate" value={formData.learningRate} onChange={handleChange} placeholder="Enter learning rate" />
            </div>
            <button type="submit" className="btn">Submit</button>
          </form>

          <h1>Prediction Results</h1>

          {/* Table for Test Results */}
          <table className="App-table">
            <thead>
              <tr>
                <th className="App-th">Test 1</th>
                <th className="App-th">Test 2</th>
                <th className="App-th">Test 3</th>
                <th className="App-th">Species</th> {/* New Column */}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="App-td">
                  {data.row1 && data.row1.map((value, index) => (
                    <p key={index}>{value}</p>
                  ))}
                </td>
                <td className="App-td">
                  {data.row2 && data.row2.map((value, index) => (
                    <p key={index}>{value}</p>
                  ))}
                </td>
                <td className="App-td">
                  {data.row3 && data.row3.map((value, index) => (
                    <p key={index}>{value}</p>
                  ))}
                </td>
                <td className="App-td">
                  {data.row1 && data.row2 && data.row3 && (
                    <div>
                      <p>{determineSpecies([data.row1[0], data.row2[0], data.row3[0]])}</p>
                      <p>{determineSpecies([data.row1[1], data.row2[1], data.row3[1]])}</p>
                      <p>{determineSpecies([data.row1[2], data.row2[2], data.row3[2]])}</p>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Table for Species Values */}
          {/* This part remains the same */}
          <h2>Definition of Values for Species</h2>
          <table className="App-table">
            <thead>
              <tr>
                <th className="App-th">Species</th>
                <th className="App-th">Values</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="App-td">setosa</td>
                <td className="App-td">1, 0, 0</td>
              </tr>
              <tr>
                <td className="App-td">virginica</td>
                <td className="App-td">0, 1, 0</td>
              </tr>
              <tr>
                <td className="App-td">versicolor</td>
                <td className="App-td">0, 0, 1</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      ) : (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Waiting for results...</span>
            </Spinner>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

