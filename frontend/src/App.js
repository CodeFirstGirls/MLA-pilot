import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/navbar';
import TrackExercise from './components/trackExercise';
import Statistics from './components/statistics';
import Footer from './components/footer';
import Login from './components/login';
import Signup from './components/signup';
import Journal from './components/journal';
import Manage from './components/manage';
import logo from './img/CFG_logo.png'; // Update the path to your logo file


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(''); 

  const handleLogout = () => {
    setIsLoggedIn(false); 
    setCurrentUser(''); 
  };

  const handleLogin = (username) => { 
    setIsLoggedIn(true);
    setCurrentUser(username);
  };
  

  return (
    <MantineProvider>
      <div className="App">
        <Router>
          <div className="grid-container">
            {isLoggedIn && <NavbarComponent onLogout={handleLogout} logo={logo} />}
            <div className="componentContainer">
              <Routes>
                <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
                <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup onSignup={(username) => {
                  setIsLoggedIn(true);
                  setCurrentUser(username);
                }} />} />
                <Route path="/trackExercise" element={isLoggedIn ? <TrackExercise currentUser={currentUser} /> : <Navigate to="/login" />} />
                <Route path="/statistics" element={isLoggedIn ? <Statistics currentUser={currentUser} /> : <Navigate to="/login" />} />
                <Route path="/journal" element={isLoggedIn ? <Journal currentUser={currentUser} /> : <Navigate to="/login" />} />
                <Route path="/manage" element={isLoggedIn ? <Manage currentUser={currentUser} /> : <Navigate to="/login" />} />
                <Route path="/" element={isLoggedIn ? <Navigate to="/trackExercise" /> : <Navigate to="/login" />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </Router>
      </div>
    </MantineProvider>
  );
}

export default App;
