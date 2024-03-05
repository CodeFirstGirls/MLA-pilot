import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './statistics.css';

const Statistics = ({ currentUser }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5050/stats/${currentUser}`;

    axios.get(url)
      .then(response => {
        setData(response.data.stats);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [currentUser]);

  const currentUserData = data.find(item => item.username === currentUser);
  
  const convertToMinSecs = (seconds) => {
    const result = new Date(seconds * 1000).toISOString().substring(14, 19);
    return result; 
  }

  const getLevelOfEffortLabel = (levelOfEffort) => {
     if (levelOfEffort >= 80) {
       return 'Very High Effort';
     } else if (levelOfEffort >= 60) {
       return 'High Effort';
     } else if (levelOfEffort >= 40) {
       return 'Moderate Effort';
     } else if (levelOfEffort >= 20) {
       return 'Low Effort';
     } else {
       return 'Very Low Effort';
      }
    };

  return (
    <div className="stats-container">
      <h4>Well done, {currentUser}! This is your overall effort:</h4>
      {currentUserData ? (
        currentUserData.exercises.map((item, index) => (
          <div key={index} className="exercise-data">
            <div><strong>{item.exerciseType}</strong></div>
            <div>Total Duration: {item.totalDuration} min</div>
            <div>Total Distance: {item.totalDistance} km</div>
            <div>Avg Pace: {convertToMinSecs(item.avgPace)} per km</div>
            <div>Avg Effort: {getLevelOfEffortLabel(item.avgLevelOfEffort)}</div>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Statistics;
