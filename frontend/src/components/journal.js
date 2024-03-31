import React, { useState, useEffect } from 'react';
import { Grid, Card, RingProgress, Text, Center, Modal, TextInput, Tooltip, Badge, Group } from '@mantine/core';
import { IconRun, IconBike, IconSwimming, IconBarbell, IconWalk, IconHelpOctagon } from '@tabler/icons-react';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import './journal.css';
import axios from 'axios';
import config from '../config';

const iconMap = {
  Running: { icon: IconRun, color: '#882255' },
  Cycling: { icon: IconBike, color: '#024059' },
  Gym: { icon: IconBarbell, color: '#4B0092' },
  Swimming: { icon: IconSwimming, color: '#0072B2' },
  Walking: { icon: IconWalk, color: '#00412A' },
  Other: { icon: IconHelpOctagon, color: '#112D6E' }
};


const Journal = ({ currentUser }) => {
  const [startDate, setStartDate] = useState(moment().startOf('week'));
  const [endDate, setEndDate] = useState(moment().endOf('week'));
  const [exerciseTargets, setExerciseTargets] = useState({});
  const [updatedTargets, setUpdatedTargets] = useState({});
  const [exercises, setExercises] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);
  const [showDetailedStats, setShowDetailedStats] = useState(false);
  const [detailedStatsExercise, setDetailedStatsExercise] = useState(null);

  const fetchGraphQLExercises = async () => {
    try {
      const payload = {
        query: `
        query WeeklyExerciseStats {
          stats: statsAggregatedByWeek(
            username: "${currentUser}"
            startdate: "${moment(startDate).format('YYYY-MM-DD')}"
            enddate: "${moment(endDate).format('YYYY-MM-DD')}"
          ) {
            exerciseType
            totalDuration
            totalDistance
            averagePace
            averageSpeed
            topSpeed
          }
        }`
      };
      const response = await axios.post(`${config.apiUrl}/stats/graphql`, payload);
      console.log('API Response:', response.data);
      if (response.data.data.stats && Array.isArray(response.data.data.stats)) {
        const sortedExercises = response.data.data.stats.sort((a, b) => a.id - b.id);
        setExercises(sortedExercises);
      } else {
        console.error('Unexpected response structure:', response.data);
        setExerciseTargets({
          Running: 0,
          Cycling: 0,
          Gym: 0,
          Swimming: 0,
          Walking: 0,
          Other: 0
        });
      }
    } catch (error) {
      console.error('Failed to fetch exercises', error);
    }
  };

  useEffect(() => {
    fetchGraphQLExercises();
  }, [currentUser, startDate, endDate]);

  const fetchWeeklyTargets = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/targets`);
      const data = response.data;
      const currentWeekTargets = data.find(target => moment(target.weekStartDate).isSame(startDate, 'week'));
      if (currentWeekTargets) {
        setExerciseTargets({
          Running: currentWeekTargets.runningTarget,
          Cycling: currentWeekTargets.cyclingTarget,
          Gym: currentWeekTargets.gymTarget,
          Swimming: currentWeekTargets.swimmingTarget,
          Walking: currentWeekTargets.walkingTarget,
          Other: currentWeekTargets.otherTarget
        });
      } else {
        setExerciseTargets({
          Running: 0,
          Cycling: 0,
          Gym: 0,
          Swimming: 0,
          Walking: 0,
          Other: 0
        });
      }
      setIsCurrentWeek(moment().isSame(startDate, 'week'));
    } catch (error) {
      console.error('Error fetching weekly targets:', error);
    }
  };

  useEffect(() => {
    fetchWeeklyTargets();
  }, [startDate]);

  const goToPreviousWeek = () => {
    setStartDate(moment(startDate).subtract(1, 'weeks').startOf('week'));
    setEndDate(moment(endDate).subtract(1, 'weeks').endOf('week'));
  };

  const goToNextWeek = () => {
    setStartDate(moment(startDate).add(1, 'weeks').startOf('week'));
    setEndDate(moment(endDate).add(1, 'weeks').endOf('week'));
  };

  const handleEditTargets = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/targets`);
      const data = response.data;
      const currentWeekTargets = data.find(target => moment(target.weekStartDate).isSame(startDate, 'week'));
      if (currentWeekTargets) {
        setUpdatedTargets({
          Running: currentWeekTargets.runningTarget,
          Cycling: currentWeekTargets.cyclingTarget,
          Gym: currentWeekTargets.gymTarget,
          Swimming: currentWeekTargets.swimmingTarget,
          Walking: currentWeekTargets.walkingTarget,
          Other: currentWeekTargets.otherTarget
        });
      } else {
        setUpdatedTargets({
          Running: exerciseTargets.Running || 0,
          Cycling: exerciseTargets.Cycling || 0,
          Gym: exerciseTargets.Gym || 0,
          Swimming: exerciseTargets.Swimming || 0,
          Walking: exerciseTargets.Walking || 0,
          Other: exerciseTargets.Other || 0
        });
      }
      setShowEditModal(true);
    } catch (error) {
      console.error('Error fetching weekly targets:', error);
    }
  };


  const handleCloseModal = () => {
    setShowEditModal(false);
  };
  const handleShowDetailedStats = (exerciseType) => {
    setShowDetailedStats(true);
    setSelectedExercise(exerciseType);
    const exercise = exercises.find((exercise) => exercise.exerciseType === exerciseType);
    setDetailedStatsExercise(exercise);
  };

  const handleCloseDetailedStats = () => {
    setShowDetailedStats(false);
    setSelectedExercise('');
    setDetailedStatsExercise(null);
  };

  const handleSaveTargets = async () => {
    try {
      const maxWeeklyTarget = 10080;
      const isInvalid = Object.values(exerciseTargets).some(value => isNaN(value) || value < 0 || value > maxWeeklyTarget);
      if (isInvalid) {
        alert(`Invalid input! Please enter a value between 0 and ${maxWeeklyTarget}.`);
        return;
      }
      const isTargetSetForFirstTime = Object.values(exerciseTargets).every(value => value === 0);
      console.log(isTargetSetForFirstTime)
      if (isTargetSetForFirstTime || !Object.keys(exerciseTargets).length) {
        const response = await axios.post(`${config.apiUrl}/targets/add`, {
          username: currentUser,
          runningTarget: updatedTargets.Running,
          cyclingTarget: updatedTargets.Cycling,
          gymTarget: updatedTargets.Gym,
          swimmingTarget: updatedTargets.Swimming,
          walkingTarget: updatedTargets.Walking,
          otherTarget: updatedTargets.Other,
          weekStartDate: startDate.toDate()
        });
        if (response.status === 201) {
          setExerciseTargets(updatedTargets);
          fetchGraphQLExercises();
        } else {
          console.error('Failed to save targets:', response.statusText);
        }
      } else {
        const response = await axios.patch(`${config.apiUrl}/targets/update`, {
          username: currentUser,
          runningTarget: updatedTargets.Running,
          cyclingTarget: updatedTargets.Cycling,
          gymTarget: updatedTargets.Gym,
          swimmingTarget: updatedTargets.Swimming,
          walkingTarget: updatedTargets.Walking,
          otherTarget: updatedTargets.Other,
          weekStartDate: startDate.toDate()
        });
        if (response.status === 200) {
          setExerciseTargets(updatedTargets);
          fetchGraphQLExercises();
        } else {
          console.error('Failed to update targets:', response.statusText);
        }
      }

      setShowEditModal(false);
      setUpdatedTargets({});
    } catch (error) {
      console.error('Error saving targets:', error);
    }
  };
  
  const sortedExercises = exercises.sort((a, b) => {
    const order = ['Running', 'Swimming', 'Cycling', 'Walking', 'Gym', 'Other'];
    return order.indexOf(a.exerciseType) - order.indexOf(b.exerciseType);
  });

  const getLabelVariant = (exerciseType) => {
    switch (exerciseType) {
      case 'Running':
        return { from: '#882255', to: 'rgba(46, 46, 46, 0.68)', deg: 158 };
      case 'Swimming':
        return { from: '#0072B2', to: 'rgba(46, 46, 46, 0.68)', deg: 158 };
      case 'Cycling':
        return { from: '#024059', to: 'rgba(46, 46, 46, 0.68)', deg: 158 };
      case 'Walking':
          return { from: '#00A86B', to: 'rgba(0, 168, 107, 0.68)', deg: 158 };
      default:
        return undefined;
    }
  };

  const renderCardContent = (exercise) => {
    if (showDetailedStats && selectedExercise === exercise.exerciseType && detailedStatsExercise) {
      return (
        <div>
          <Card padding="xl" radius="md" className='card'>
            <Grid justify="space-between" align="flex-start">
              <Grid.Col span={6}>
                <div>
                  <Text className='label' variant="gradient" gradient={getLabelVariant(exercise.exerciseType)}>
                    {exercise.totalDistance !== null ? (
                      <>
                        {exercise.totalDistance.toFixed(1)}
                        <Text size="xs" c="dimmed" span>
                          {' km'}
                        </Text>
                      </>
                    ) : (
                      'N/A'
                    )}
                  </Text>
                  <Text size="xs" c="dimmed" inline>
                    Total Distance
                  </Text>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div>
                  <Text className='label' variant="gradient" gradient={getLabelVariant(exercise.exerciseType)}>
                    {exercise.topSpeed !== null ? (
                      <>
                        {exercise.topSpeed.toFixed(1)}
                        <Text size="xs" c="dimmed" span>
                          {' km/hr'}
                        </Text>
                      </>
                    ) : (
                      'N/A'
                    )}
                  </Text>
                  <Text size="xs" c="dimmed" inline>
                    Top Speed
                  </Text>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div>
                  <Text className='label' variant="gradient" gradient={getLabelVariant(exercise.exerciseType)}>
                    {exercise.averagePace !== null ? (
                      <>
                        {exercise.averagePace.toFixed(1)}
                        <Text size="xs" c="dimmed" span>
                          {' min/km'}
                        </Text>
                      </>
                    ) : (
                      'N/A'
                    )}
                  </Text>
                  <Text size="xs" c="dimmed" inline>
                    Average Pace
                  </Text>
                </div>

              </Grid.Col>
              <Grid.Col span={6}>
                <div>
                  <Text className='label' variant="gradient" gradient={getLabelVariant(exercise.exerciseType)}>
                    {exercise.averageSpeed !== null ? (
                      <>
                        {exercise.averageSpeed.toFixed(1)}
                        <Text size="xs" c="dimmed" span>
                          {' km/hr'}
                        </Text>
                      </>
                    ) : (
                      'N/A'
                    )}
                  </Text>
                  <Text size="xs" c="dimmed" inline>
                    Average Speed
                  </Text>
                </div>

              </Grid.Col>
            </Grid>
          </Card>
          {/* Button to close detailed stats */}
          <Badge size="sm"
            variant="light"
            color='#D41159'
            style={{ marginTop: 10, cursor: 'pointer' }}
            onClick={handleCloseDetailedStats}>
            Close All Stats
          </Badge>
        </div>
      );
    } else {
      // Render progress ring and basic stats
      const { icon: Icon, color } = iconMap[exercise.exerciseType];
      const progress = (exercise.totalDuration / exerciseTargets[exercise.exerciseType]) * 100;
      return (
        <div>
          {/* Progress ring */}
          <div style={{ position: 'relative', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RingProgress size={80} roundCaps thickness={8} sections={[{ value: progress, color }]} />
            <Center style={{ position: 'absolute' }}>
              <Icon size={20} style={{ zIndex: 1 }} />
            </Center>
          </div>
          {/* Basic stats */}
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Text className="exercise-type" c="dimmed" size="xs" tt="uppercase" fw={700}>
              {exercise.exerciseType}
            </Text>
            <Text className="exercise-time" fw={700} size="l">
              {exerciseTargets[exercise.exerciseType] ? (
                `${exercise.totalDuration} out of ${exerciseTargets[exercise.exerciseType]} mins ${exercise.totalDuration >= exerciseTargets[exercise.exerciseType] ? '🎉' : ''
                }`
              ) : (
                `${exercise.totalDuration} mins`
              )}
            </Text>
            {/* Button to show detailed stats */}
            {['Running', 'Swimming', 'Cycling', 'Walking'].includes(exercise.exerciseType) && (
              <Badge
                size="sm"
                variant="light"
                color='#006CD1'
                style={{ marginTop: 10, cursor: 'pointer' }}
                onClick={() => handleShowDetailedStats(exercise.exerciseType)}
              >
                Show All Stats
              </Badge>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="journal-container">
      <h4>Weekly Exercise Journal</h4>
      <hr />
      <div className="date-range">
        <Button className="button-small" onClick={goToPreviousWeek}>&larr; Previous</Button>
        <span>{startDate.format('MMM DD, YYYY')} - {endDate.format('MMM DD, YYYY')}</span>
        {!isCurrentWeek && <Button className="button-small" onClick={goToNextWeek}>Next &rarr;</Button>}
      </div>

      <div className="weekly-target" onClick={handleEditTargets} style={{ cursor: 'pointer' }}>
        <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Edit Weekly Target</Text>
      </div>

      {showEditModal && (
        <Modal opened={showEditModal} onClose={handleCloseModal} title="Edit Weekly Targets" size="sm">
          <Grid gutter="sm">
            {Object.keys(iconMap).map((exerciseType, index) => (
              <Grid.Col key={index} span={12}>
                <TextInput
                  label={exerciseType}
                  value={updatedTargets[exerciseType] || ''}
                  onChange={(event) => {
                    const inputValue = event.target.value.trim();
                    const value = inputValue === '' ? '' : parseInt(inputValue, 10);
                    if (inputValue === '' || (!isNaN(value) && value >= 0)) {
                      setUpdatedTargets(prevState => ({ ...prevState, [exerciseType]: value }));
                    }
                  }}
                  type="number"
                  min={0}
                  max={10080}
                  disabled={!isCurrentWeek}
                />
              </Grid.Col>
            ))}
          </Grid>
          {!isCurrentWeek && (
            <Text style={{ marginTop: '10px', color: 'red' }}>
              Editing for previous weeks is not allowed.
            </Text>
          )}
          <div style={{ textAlign: 'right', marginTop: '16px' }}>
            <Button onClick={handleSaveTargets} variant="primary" disabled={!isCurrentWeek}>
              Save
            </Button>
          </div>
        </Modal>
      )}

      <Grid gutter="md" justify="center">
        {sortedExercises.map((exercise, index) => (
          <Grid.Col key={index} span={{ xs: 12, sm: 6, md: 4 }}>
            <Card shadow="xs" className="mantine-card">
              {renderCardContent(exercise)}
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default Journal;