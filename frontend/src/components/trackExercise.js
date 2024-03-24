import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import { trackExercise, updateExercise } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@material-ui/core/IconButton';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import BikeIcon from '@material-ui/icons/DirectionsBike';
import PoolIcon from '@material-ui/icons/Pool';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import OtherIcon from '@material-ui/icons/HelpOutline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const TrackExercise = ({ currentUser }) => {
  const location = useLocation();
  const toUpdate = location.state?._id ? true : false;
  const [state, setState] = useState({
    exerciseType: location.state?.exerciseType ?? '',
    description: location.state?.description ?? '',
    duration: location.state?.duration ?? 0,
    distance: location.state?.distance ?? 0,
    date: new Date(location.state?.date ?? Date()),
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    if (state.date > new Date()) {
      setError('Selected date cannot be in the future.');
      return;
    }

    if (state.duration <= 0) {
      setError('Please enter valid duration');
      return;
    }

    if ((state.exerciseType === 'Running' || state.exerciseType === 'Swimming') && state.distance <= 0) {
      setError('Please enter valid distance');
      return;
    }

    if (!state.exerciseType) {
      setError('Please select an exercise type');
      return;
    }

    const dataToSubmit = {
      username: currentUser,
      ...state,
    };

    const dataToUpdate = {
      username: currentUser,
      id: location?.state?._id,
      ...state,
    }

    try {

      if (toUpdate) {
        console.log('data to update', dataToUpdate);
        const id = location.state._id;
        const response = await updateExercise(id, dataToUpdate);
        console.log('updated record', response.data);

        setMessage('Activity updated successfully!');

      } else {
        const response = await trackExercise(dataToSubmit);
        console.log('create new record', response.data);

        setMessage('Activity logged successfully! Well done!');
      }

      setState({
        exerciseType: '',
        description: '',
        duration: 0,
        distance: 0,
        date: new Date(),
      });
      setTimeout(() => setMessage(''), 2000);
      setError('');

    } catch (error) {
      console.error('There was an error logging your activity!', error);
      setError('Failed to log activity. Please try again.');
    }
  };

  return (
    <div>
      <h3>Track exercise</h3>
      <Form onSubmit={onSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>

        <Form.Group controlId="formDate" className="form-margin">
          <Form.Label>Date:</Form.Label>
          <DatePicker
            selected={state.date}
            onChange={(date) => setState({ ...state, date })}
            dateFormat="yyyy/MM/dd"
          />
        </Form.Group>
        <div style={{ marginBottom: '20px' }}>
          <IconButton color={state.exerciseType === 'Running' ? "primary" : "default"} onClick={() => setState({ ...state, exerciseType: 'Running' })} title="Running">
            <DirectionsRunIcon fontSize="large" />
          </IconButton>
          <IconButton color={state.exerciseType === 'Cycling' ? "primary" : "default"} onClick={() => setState({ ...state, exerciseType: 'Cycling' })} title="Cycling">
            <BikeIcon fontSize="large" />
          </IconButton>
          <IconButton color={state.exerciseType === 'Swimming' ? "primary" : "default"} onClick={() => setState({ ...state, exerciseType: 'Swimming' })} title="Swimming">
            <PoolIcon fontSize="large" />
          </IconButton>
          <IconButton color={state.exerciseType === 'Gym' ? "primary" : "default"} onClick={() => setState({ ...state, exerciseType: 'Gym' })} title="Gym">
            <FitnessCenterIcon fontSize="large" />
          </IconButton>
          <IconButton color={state.exerciseType === 'Other' ? "primary" : "default"} onClick={() => setState({ ...state, exerciseType: 'Other' })} title="Other">
            <OtherIcon fontSize="large" />
          </IconButton>
        </div>
        <Form.Group controlId="description" style={{ marginBottom: '20px' }}>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            value={state.description}
            onChange={(e) => setState({ ...state, description: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="duration" style={{ marginBottom: '40px' }}>
          <Form.Label>Duration (in minutes):</Form.Label>
          <Form.Control
            type="number"
            required
            value={state.duration}
            onChange={(e) => setState({ ...state, duration: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="distance" style={{ marginBottom: '40px' }}>
          <Form.Label>Distance (in kilometers):</Form.Label>
          <Form.Control
            type="number"
            required
            value={state.distance}
            onChange={(e) => setState({ ...state, distance: e.target.value })}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Save activity
        </Button>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default TrackExercise;
