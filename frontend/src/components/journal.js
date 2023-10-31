import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import './journal.css';

const Journal = ({ currentUser }) => {
  const [startDate, setStartDate] = useState(moment().startOf('week').toDate());
  const [endDate, setEndDate] = useState(moment().endOf('week').toDate());
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const url = `http://localhost:5050/api/stats/weekly/?user=${currentUser}&start=${moment(startDate).format('YYYY-MM-DD')}&end=${moment(endDate).format('YYYY-MM-DD')}`;
      const response = await axios.get(url);
      console.log('API Response:', response.data); 
      setExercises(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch exercises', error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [currentUser, startDate, endDate]);

  const goToPreviousWeek = () => {
    setStartDate(moment(startDate).subtract(1, 'weeks').startOf('week').toDate());
    setEndDate(moment(endDate).subtract(1, 'weeks').endOf('week').toDate());
  };

  const goToNextWeek = () => {
    setStartDate(moment(startDate).add(1, 'weeks').startOf('week').toDate());
    setEndDate(moment(endDate).add(1, 'weeks').endOf('week').toDate());
  };

  return (
    <div className="journal-container">
      <h4>Weekly Exercise Journal</h4>
      <br></br>
      <div className="date-range">
        <Button className="button-small" onClick={goToPreviousWeek}>&larr; Previous</Button>
        <span>{moment(startDate).format('YYYY-MM-DD')} to {moment(endDate).format('YYYY-MM-DD')}</span>
        <Button className="button-small" onClick={goToNextWeek}>Next &rarr;</Button>
      </div>
      <ul>
        {exercises && exercises.length > 0 && exercises[0].exercises.map((exercise, index) => (
          <li key={index} className="exercise-journal-data">
            {exercise.exerciseType} - {exercise.totalDuration} minutes
          </li>
        ))}
      </ul>
    </div>
);
};

export default Journal;
