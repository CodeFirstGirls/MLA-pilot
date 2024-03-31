import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Text, SimpleGrid, UnstyledButton, Group, useMantineTheme } from '@mantine/core';
import { IconRun, IconBike, IconSwimming, IconBarbell, IconHelpOctagon, IconWalk } from '@tabler/icons-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@mantine/core/styles.css';
import classes from './trackExercise.css';
import { trackExercise, updateExercise } from '../api';

const TrackExercise = ({ currentUser }) => {
  const location = useLocation();
  const toUpdate = location.state?._id ? true : false;
  const [state, setState] = useState({
    exerciseType: location.state?.exerciseType ?? '',
    description: location.state?.description ?? '',
    duration: location.state?.duration ?? 0,
    date: new Date(location.state?.date ?? Date()),
    distance: location.state?.distance ?? 0, 
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [speed, setSpeed] = useState(0);
  const [pace, setPace] = useState(0);

  useEffect(() => {
    if (state.distance > 0 && state.duration > 0) {
      const speedValue = state.distance / (state.duration / 60); // Speed in km/hr?
      setSpeed(speedValue);
    } else {
      setSpeed(0);
    }

    if (state.distance > 0 && state.duration > 0) {
      const paceValue = (state.duration) / state.distance; // Pace in minutes per km?
      setPace(paceValue);
    } else {
      setPace(0);
    }
  }, [state.distance, state.duration]);

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

    if (!state.exerciseType) {
      setError('Please select an exercise type');
      return;
    }

    const dataToSubmit = {
      username: currentUser,
      ...state,
      pace: pace.toFixed(2), 
      speed: speed.toFixed(2), 
    };

    const dataToUpdate = {
      username: currentUser,
      id: location?.state?._id,
      ...state,
      pace: pace.toFixed(2), 
      speed: speed.toFixed(2), 
    };

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
        date: new Date(),
        distance: 0,
      });
      setTimeout(() => setMessage(''), 2000);
      setError('');
    } catch (error) {
      console.error('There was an error logging your activity!', error);
      setError('Failed to log activity. Please try again.');
    }
  };


  const handleExerciseTypeChange = (type) => {
    setState({ ...state, exerciseType: type, distance: 0 });
  };

  const renderExerciseGrid = () => (
    <Card withBorder radius="md" className="exercise-card">
      <Group justify="space-between">
        <Text className='title'>Select Exercise</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {exerciseTypes.map(({ type, icon }) => (
          <UnstyledButton
            key={type}
            className="exercise-item"
            onClick={() => handleExerciseTypeChange(type)}
            style={{ color: state.exerciseType === type ? '#882255' : 'black' }}
          >
            {icon}
            <Text size="m" mt={7}>{type}</Text>
          </UnstyledButton>
        ))}
      </SimpleGrid>
    </Card>

  );

  const exerciseTypes = [
    { type: 'Running', icon: <IconRun size="2.5rem" stroke={2} />, hasDistance: true },
    { type: 'Cycling', icon: <IconBike size="2.5rem" stroke={2} />, hasDistance: true },
    { type: 'Swimming', icon: <IconSwimming size="2.5rem" stroke={2} />, hasDistance: true },
    { type: 'Walking', icon: <IconWalk size="2.5rem" stroke={2} />, hasDistance: true },
    { type: 'Gym', icon: <IconBarbell size="2.5rem" stroke={2} />, hasDistance: false },
    { type: 'Other', icon: <IconHelpOctagon size="2.5rem" stroke={2} />, hasDistance: false },
  ];

  return (
    <div className='trackExercise-container'>
      <h4>Track New Exercise</h4>
      <hr />
      <Form onSubmit={onSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
        <div style={{ marginBottom: '20px' }}>
          {renderExerciseGrid()}
        </div>
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Form.Group controlId="formDate" className="form-margin" style={{ marginBottom: '20px' }}>
            <Form.Label>Date:</Form.Label>
            <DatePicker
              selected={state.date}
              onChange={(date) => setState({ ...state, date })}
              dateFormat="yyyy/MM/dd"
            />
          </Form.Group>

          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: state.exerciseType && exerciseTypes.find((item) => item.type === state.exerciseType)?.hasDistance ? '50%' : '60%' }}>
              <Form.Group controlId="duration" style={{ marginBottom: '0' }}>
                <Form.Label>Duration (in minutes):</Form.Label>
                <Form.Control
                  type="number"
                  required
                  value={state.duration}
                  onChange={(e) => setState({ ...state, duration: e.target.value })}
                />
              </Form.Group>
            </div>
            {state.exerciseType && exerciseTypes.find((item) => item.type === state.exerciseType)?.hasDistance && (
              <div style={{ width: '50%', marginLeft: '20px' }}>
                <Form.Group controlId="distance" style={{ marginBottom: '0' }}>
                  <Form.Label>Distance (in km):</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={state.distance}
                    onChange={(e) => setState({ ...state, distance: e.target.value })}
                  />
                </Form.Group>
              </div>
            )}
          </div>

          {state.exerciseType && (state.exerciseType === 'Gym' || state.exerciseType === 'Other') && (
            <Form.Group controlId="description" style={{ marginBottom: '10px', width: '60%' }}>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                required
                value={state.description}
                onChange={(e) => setState({ ...state, description: e.target.value })}
              />
            </Form.Group>
          )}

        </div>
        {state.distance > 0 && state.duration > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Card withBorder radius="md" style={{ marginRight: '10px' }}>
              <Group justify="space-between">
                <Text className='title'>Pace</Text>
              </Group>
              <div style={{ padding: '20px' }}>
                <Text size="xl">{pace.toFixed(2)} <span style={{ fontSize: '0.8em' }}>min/km</span></Text>
              </div>
            </Card>
            <Card withBorder radius="md">
              <Group justify="space-between">
                <Text className='title'>Speed</Text>
              </Group>
              <div style={{ padding: '20px' }}>
                <Text size="xl">{speed.toFixed(2)} <span style={{ fontSize: '0.8em' }}>km/hr</span></Text>
              </div>
            </Card>
          </div>

        )}

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