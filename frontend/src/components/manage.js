import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import './journal.css';
import config from '../config';


const Manage = ({ currentUser }) => {
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  const getExercises = async () => {
    try {
      const url = `${config.apiUrl}/exercises/user/${currentUser}`;
      const response = await axios.get(url);
      if (response.data) {
        setExercises(response.data);
      } else {
        console.error('There was an error fetching the data!', response.data);
        setExercises([]);
      }
    } catch (error) {
      console.error('Failed to fetch exercises', error);
    }
  };

  useEffect(() => {
    getExercises();
  }, [exercises, currentUser]);

  const deleteExercise = (id) => {
    axios.delete(`${config.apiUrl}/exercises/${id}`).then((response) => {
      getExercises();
    });
  };

  const editExercise = (id) => {
    axios.get(`${config.apiUrl}/exercises/${id}`).then((response) => {
      navigate(`/trackExercise/`, {
        state: response.data
      });
    });
  };


  return (
    <div className="journal-container">
      <h4>All Exercises</h4>
      <br></br>
      <ul>
        {exercises && exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <li key={index} className="exercise-journal-data">
              <div>
                <div><b>{moment(exercise.date).format('MMM DD, YYYY')}</b></div>
                <div>{exercise.exerciseType}</div>
                <div>{exercise.duration} mins</div>
              </div>
              <div>
                <button className='btn' onClick={() => editExercise(exercise._id)}>
                  Edit
                </button>
                <button className='btn' onClick={() => deleteExercise(exercise._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No exercises found for this period.</li>
        )}
      </ul>
    </div>
  );
};

export default Manage;
