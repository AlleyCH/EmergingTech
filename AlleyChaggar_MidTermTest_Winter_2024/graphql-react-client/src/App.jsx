import './App.css';
//
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';

import PromptList from './components/PromptList';
import AddPrompt from './components/AddPrompt';

import Home from './components/Home';

//
function App() {

  return (
    <Router>
      
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">React Client For GraphQL API</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/Home" >Home</Nav.Link>
              <Nav.Link as={Link} to="/AddPrompt">Add Prompt</Nav.Link>
              <Nav.Link as={Link} to="/PromptList">Prompt List</Nav.Link>              
              {/* <Nav.Link as={Link} to="/addstudent">Add Student</Nav.Link>
              <Nav.Link as={Link} to="/studentlist">Student List</Nav.Link>
              <Nav.Link as={Link} to="/deletestudent">Delete Student</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path = "Home" element={<Home />} /> 
          <Route path = "PromptList" element={<PromptList />} />
          <Route path = "AddPrompt" element={<AddPrompt />} />          
        </Routes>
    </div>
    </Router>
  );
}

export default App;
