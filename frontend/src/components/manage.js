import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Table, Text, ScrollArea, rem, ActionIcon, Flex, Tooltip } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconEdit, IconTrash } from '@tabler/icons-react';
import moment from 'moment';
import './manage.css';
import config from '../config';

const Manage = ({ currentUser }) => {
  const [exercises, setExercises] = useState([]);
  const [sortedExercises, setSortedExercises] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSortedExercises(exercises);
  }, [exercises]);

  const handleSort = (field) => {
    setSortBy(field);
    setReverseSortDirection((prevReverseSortDirection) =>
      field === sortBy ? !prevReverseSortDirection : false
    );
    filterAndSortExercises(field);
  };

  const filterAndSortExercises = (sortByField) => {
    const sortedExercisesCopy = [...exercises];

    sortedExercisesCopy.sort((a, b) => {
      if (sortByField === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      }

      if (sortByField === 'duration') {
        return a.duration - b.duration;
      }

      if (sortByField === 'distance' || sortByField === 'pace' || sortByField === 'speed') {
        // Convert pace to seconds per km for sorting
        if (sortByField === 'pace') {
          const paceA = moment.duration(a[sortByField]).asSeconds();
          const paceB = moment.duration(b[sortByField]).asSeconds();
          return paceA - paceB;
        }
        return a[sortByField] - b[sortByField];
      }

      const fieldA = a[sortByField].toLowerCase();
      const fieldB = b[sortByField].toLowerCase();
      return fieldA.localeCompare(fieldB);
    });

    if (reverseSortDirection) {
      sortedExercisesCopy.reverse();
    }

    setSortedExercises(sortedExercisesCopy);
  };


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
      setExercises([]);
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

  const handleDeleteExercise = async (id) => {
    axios.delete(`${config.apiUrl}/exercises/${id}`).then((response) => {
      getExercises();
    });
  };

  const handleEditExercise = (id) => {
    axios.get(`${config.apiUrl}/exercises/${id}`).then((response) => {
      navigate(`/trackExercise/`, {
        state: response.data
      });
    });
  };

  const exerciseRows = sortedExercises.map((exercise, index) => (
    <Table.Tr key={index} className="exercise-journal-data">
      <Table.Td style={{ textAlign: 'center' }}>{moment(exercise.date).format('MMM DD, YYYY')}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>{exercise.exerciseType}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>{exercise.duration} mins</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>{exercise.distance !== 0 ? `${exercise.distance} km` : '-'}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>{exercise.pace !== 0 ? `${exercise.pace} min/km` : '-'}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>{exercise.speed !== 0 ? `${exercise.speed} km/hr` : '-'}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>
        <Flex gap="md" style={{ justifyContent: 'center' }}>
          <Tooltip label="Edit">
            <ActionIcon size={25} color='#0072B2' onClick={() => handleEditExercise(exercise._id)}>
              <IconEdit style={{ width: rem(20), height: rem(20) }} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon size={25} color="#882255" onClick={() => handleDeleteExercise(exercise._id)}>
              <IconTrash style={{ width: rem(20), height: rem(20) }} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));
  

  return (
    <ScrollArea className='manageContainer'>
      <h4>Manage Exercise</h4>
      <hr/>
      <Table horizontalSpacing="md" verticalSpacing="md" miw={700} layout="fixed">
        <Table.Tbody>
          <Table.Tr>
            <Th sorted={sortBy === 'date'} reverseSortDirection={reverseSortDirection} onSort={() => handleSort('date')}>Date</Th>
            <Th sorted={sortBy === 'exerciseType'} reverseSortDirection={reverseSortDirection} onSort={() => handleSort('exerciseType')}>Exercise Type</Th>
            <Th sorted={sortBy === 'duration'} reverseSortDirection={reverseSortDirection} onSort={() => handleSort('duration')}>Duration</Th>
            <Th sorted={sortBy === 'distance'} reverseSortDirection={reverseSortDirection} onSort={() => handleSort('distance')}>Distance</Th>
            <Th sorted={sortBy === 'pace'} reverseSortDirection={reverseSortDirection} onSort={() => handleSort('pace')}>Pace</Th>
            <Th sorted={sortBy === 'speed'} reverseSortDirection={reverseSortDirection} onSort={() => handleSort('speed')}>Speed</Th>
            <Th>Actions</Th>
          </Table.Tr>
          {exerciseRows.length > 0 ? (
            exerciseRows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={7}>
                <Text fw={500} ta="center">No exercises found.</Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

const Th = ({ children, sorted, reverseSortDirection, onSort }) => {
  const Icon = sorted ? (reverseSortDirection ? IconChevronUp : IconChevronDown) : null;

  return (
    <Table.Th onClick={onSort} className="th" style={{ fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>{children}</div>
      {Icon && <Icon className="icon" style={{ width: rem(16), height: rem(16), marginLeft: '0.25rem' }} />}
    </div>
  </Table.Th>
);
};

export default Manage;

