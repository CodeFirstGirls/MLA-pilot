import React, { useState, useEffect } from 'react';
import { Grid, Card, RingProgress, Text, Center } from '@mantine/core';
import { BiRun, BiCycling, BiDumbbell, BiSwim } from 'react-icons/bi'; // Import icons for exercise types
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { Button } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import './journal.css';
import config from '../config';

const iconMap = {
    Running: { icon: BiRun, color: '#322142' },
    Cycling: { icon: BiCycling, color: '#03A6A6' },
    Gym: { icon: BiDumbbell, color: '#00563E' },
    Swimming: { icon: BiSwim, color: '#CE466B' },
    Other: { icon: FaPersonCircleQuestion, color: '#F25757' } // Changed icon to FaUserCircle
};

const Journal = ({ currentUser, weeklyGoal=120 }) => {
  const [startDate, setStartDate] = useState(moment().startOf('week').toDate());
  const [endDate, setEndDate] = useState(moment().endOf('week').toDate());
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    try {
      const url = `${config.apiUrl}/stats/weekly/?user=${currentUser}&start=${moment(startDate).format('YYYY-MM-DD')}&end=${moment(endDate).format('YYYY-MM-DD')}`;
      const response = await axios.get(url);
      console.log('API Response:', response.data);
      if (response.data.stats && Array.isArray(response.data.stats)) {
        setExercises(response.data.stats);
      } else {
        console.error('Unexpected response structure:', response.data);
        setExercises([]);
      }
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

  // Check if endDate is the end of the current week
  const isCurrentWeek = moment().startOf('week').isSame(moment(startDate), 'week');

  return (
    <div className="journal-container">
      <h4>Weekly Exercise Journal</h4>
      <br></br>
      <div className="date-range">
        <Button className="button-small" onClick={goToPreviousWeek}>&larr; Previous</Button>
        <span>{moment(startDate).format('MMM DD, YYYY')} - {moment(endDate).format('MMM DD, YYYY')}</span>
        {!isCurrentWeek && <Button className="button-small" onClick={goToNextWeek}>Next &rarr;</Button>}
      </div>
      <div className="weekly-target" style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Weekly Target: {weeklyGoal} minutes</Text>
      </div>
      <Grid gutter="md" justify="center">
        {exercises.map((exercise, index) => {
          const { icon: Icon, color } = iconMap[exercise.exerciseType];
          const progress = (exercise.totalDuration / weeklyGoal) * 100; // Assuming weekly goal is 120 minutes
          return (
            <Grid.Col key={index} span={{ xs: 12, sm: 6, md: 4 }}>
              <Card shadow="xs" className="mantine-card">
                <div style={{ position: 'relative', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[{ value: progress, color }]}
                  />
                  <Center style={{ position: 'absolute' }}>
                    <Icon size={20} style={{ zIndex: 1 }} />
                  </Center>
                </div>
                <div style={{ textAlign: 'center', marginTop: 10 }}>
                  <Text className="exercise-type" c="dimmed" size="xs" tt="uppercase" fw={700}>
                    {exercise.exerciseType}
                  </Text>
                  <Text className="exercise-time" fw={700} size="xl">
                    {exercise.totalDuration} min
                  </Text>
                </div>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default Journal;
