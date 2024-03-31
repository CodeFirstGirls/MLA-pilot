import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import config from '../config';
import { Table, Text, ScrollArea, rem, ActionIcon, Flex, Tooltip } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts'; // Add recharts components

const UserProfile = ({ currentUser }) => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser,
    height: '',
    weight: '',
    dateMeasured: new Date()
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const fetchUserProfiles = async () => {
    try {
      const url = `${config.apiUrl}/userprofiles/user/${currentUser}`;
      const response = await axios.get(url);
      console.log('API URL:', url);
      setUserProfiles(response.data);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };

  const handleSort = (sortByField) => {
    setSortBy(sortByField);
    setReverseSortDirection(prevReverseSortDirection =>
      sortByField === sortBy ? !prevReverseSortDirection : false
    );
    sortUserProfiles(sortByField);
  };
  
  const sortUserProfiles = (sortByField) => {
    const sortedUserProfiles = [...userProfiles];
  
    sortedUserProfiles.sort((a, b) => {
      let comparison = 0;
      if (sortByField === 'dateMeasured') {
        const dateA = new Date(a.dateMeasured);
        const dateB = new Date(b.dateMeasured);
        comparison = dateA - dateB;
      } else {
        comparison = a[sortByField] - b[sortByField];
      }
      return comparison;
    });
  
    if (reverseSortDirection) {
      sortedUserProfiles.reverse();
    }
  
    setUserProfiles(sortedUserProfiles);
  };

  const deleteUserProfile = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/userprofiles/${id}`);
      setUserProfiles(userProfiles.filter(profile => profile._id !== id));
    } catch (error) {
      console.error('Error deleting user profile:', error);
    }
  };

  const handleCloseModal = () => {
      setShowModal(false);
  };

  const handleOpenModal = (profileId) => {
    if (profileId) {
      const profileToUpdate = userProfiles.find(profile => profile._id === profileId);
      setFormData({
        ...formData,
        _id: profileId,
        height: profileToUpdate.height,
        weight: profileToUpdate.weight,
        dateMeasured: new Date(profileToUpdate.dateMeasured)
      });
    } else {
      setFormData({
        ...formData,
        _id: '',
        height: '',
        weight: '',
        dateMeasured: new Date()
      });
    }
    setShowModal(true);
  };

  const handleAddOrUpdate = async () => {
    try {
      if (!formData.height || !formData.weight) {
        setError('Please enter both height and weight.');
        return;
      }
  
      if (formData.height < 100 || formData.height > 300) {
        setError('Height must be between 100 and 300 cm.');
        return;
      }
  
      if (formData.weight <= 0) {
        setError('Weight must be greater than 0.');
        return;
      }
  
      if (formData._id) {
        await updateUserProfile(formData._id, formData);
      } else {
        await addUserProfile(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error adding/updating user profile:', error);
    }
  };

  const updateUserProfile = async (id, newData) => {
    try {
      await axios.put(`/userprofiles/update/${id}`, newData);
      fetchUserProfiles();
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const addUserProfile = async (newProfileData) => {
    try {
      await axios.post('/userprofiles/add', newProfileData);
      fetchUserProfiles(); 
    } catch (error) {
      console.error('Error adding user profile:', error);
    }
  };

  const weightChartData = userProfiles.map((profile) => ({
    date: moment(profile.dateMeasured).format('MMM DD, YYYY'),
    weight: profile.weight
  })).sort((a, b) => moment(a.date).unix() - moment(b.date).unix());

  const userProfileRows = userProfiles.map((profile, index) => {
    const heightInMeters = profile.height / 100;
    const bmi = (profile.weight / (heightInMeters * heightInMeters)).toFixed(2);
    return (
      <Table.Tr key={index} className="user-profile-data">
        <Table.Td style={{ textAlign: 'center' }}>{profile.height}</Table.Td>
        <Table.Td style={{ textAlign: 'center' }}>{profile.weight}</Table.Td>
        <Table.Td style={{ textAlign: 'center' }}>{bmi}</Table.Td>
        <Table.Td style={{ textAlign: 'center' }}>{moment(profile.dateMeasured).format('MMM DD, YYYY')}</Table.Td>
        <Table.Td style={{ textAlign: 'center' }}>
          <Flex gap="md" style={{ justifyContent: 'center' }}>
            <Tooltip label="Edit">
              <ActionIcon size={25} color='#0072B2' onClick={() => handleOpenModal(profile._id)}>
                <IconEdit style={{ width: rem(20), height: rem(20) }}/>
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete">
              <ActionIcon size={25} color="#882255" onClick={() => deleteUserProfile(profile._id)}>
                <IconTrash style={{ width: rem(20), height: rem(20) }} />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea className='userProfileContainer'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h4 style={{ margin: 0 }}>{currentUser} Personal Metrics</h4>
      <Button variant="primary" onClick={() => handleOpenModal()}> 
        <IconPlus style={{ marginRight: '0.5rem' }} /> Add Metrics
      </Button>
    </div>
      <hr/>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}>
          <Table horizontalSpacing="md" verticalSpacing="md" miw={700} layout="fixed">
            <Table.Tbody>
              <Table.Tr>
                <Th sorted={sortBy === 'height'} reverseSortDirection={reverseSortDirection} onSort={() => handleSort('height')}>Height (in cm)</Th>
                <Th sorted={sortBy === 'weight'} reverseSortDirection={reverseSortDirection} onSort={() => handleSort('weight')}>Weight (in Kilos)</Th>
                <Th sorted={sortBy === 'bmi'} reverseSortDirection={reverseSortDirection} onSort={() => handleSort('bmi')}>BMI</Th>
                <Th sorted={sortBy === 'dateMeasured'} reverseSortDirection={reverseSortDirection} onSort={() => handleSort('dateMeasured')}>Date Measured</Th>
                <Th>Actions</Th>
              </Table.Tr>
              {userProfileRows.length > 0 ? (
                userProfileRows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Text fw={500} ta="center">No personal Metrics found for the user.</Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </div>
        <div style={{ flex: '1', marginLeft: '20px' }}> {/* Chart container */}
          <LineChart width={400} height={300} data={weightChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottom', dy: 10 }} /> {/* Add label for x-axis */}
          <YAxis label={{ value: 'Weight', angle: -90, position: 'insideLeft' }} /> {/* Add label for y-axis */}
          <RechartsTooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          </LineChart>
      </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Metrics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="height">
              <Form.Label>Height (in cm)</Form.Label>
              <Form.Control type="number" value={formData.height} 
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              min={100}
              max={300}
              required />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.Label>Weight (in kg)</Form.Label>
              <Form.Control type="number" value={formData.weight} 
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              min={0}
              required />
            </Form.Group>
            <Form.Group controlId="dateMeasured">
              <Form.Label>Date Measured</Form.Label>
              <br />
              <DatePicker selected={formData.dateMeasured} 
              onChange={(date) => setFormData({ ...formData, dateMeasured: date })} dateFormat="yyyy/MM/dd"
              maxDate={new Date()}
              required />
            </Form.Group>
            <br />
            <Button variant="primary" onClick={handleAddOrUpdate}>
              Save
            </Button>
          </Form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>}
        </Modal.Body>
      </Modal>
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
  
export default UserProfile;
