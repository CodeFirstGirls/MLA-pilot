'use client'
import React, { useState } from 'react';
import {
  Text,
  Box,
  Flex,
  Title,
  useMantineTheme,
} from '@mantine/core';
import Header from '../../components/Header/Header';
import './page.module.css'; 

interface Video {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  muscleGroups: string;
}

const GymTutorials = () => {
  const theme = useMantineTheme();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const videos: Video[] = [
    {
      id: 1,
      title: 'Bench Press',
      description: 'Discover the correct techniques for a bench press to maximize your workout efficiency.',
      videoUrl: 'https://www.youtube.com/embed/4Y2ZdHCOXok',
      muscleGroups: 'Chest, Triceps, Shoulders'
    },
    {
      id: 2,
      title: 'Squat',
      description: 'Master the squat exercise with proper form and technique.',
      videoUrl: 'https://www.youtube.com/embed/8Kls95w2jFA',
      muscleGroups: 'Quadriceps, Glutes, Hamstrings'
    },
    {
      id: 3,
      title: 'Deadlift',
      description: 'Unlock the secrets to a perfect deadlift, essential for back strength and core stability.',
      videoUrl: 'https://www.youtube.com/embed/p2OPUi4xGrM',
      muscleGroups: 'Back, Glutes, Hamstrings'
    },
    {
      id: 4,
      title: 'Overhead Press',
      description: 'Enhance your shoulder strength with the overhead press by learning the optimal form.',
      videoUrl: 'https://www.youtube.com/embed/KP1sYz2VICk',
      muscleGroups: 'Shoulders, Triceps'
    },
    {
      id: 5,
      title: 'Bent Over Row',
      description: 'Explore the fundamentals of the bent over row for strengthening your back with this guide.',
      videoUrl: 'https://www.youtube.com/embed/Nqh7q3zDCoQ',
      muscleGroups: 'Back, Biceps'
    }
  ];

  const handleSelect = (video: Video) => {
    setSelectedItem(video.videoUrl);
  };

  return (
    <Box style={{ backgroundColor: theme.colors.gray[1], minHeight: '100vh' }}>
      <Header />
      <Box style={{ padding: '1rem' }}>
        <Title className="title" ta="center" order={1}>
          Gym Tutorial Videos
        </Title>
      </Box>
      <Flex
        style={{
          padding: '0px',
          borderRadius: '0px',
          boxShadow: theme.shadows.md,
          marginTop: '0vh',
          maxWidth: '1800px',
          width: '100%',
        }}
      >
        <Box style={{ marginTop: '1rem', flex: 1 }}>
          {videos.map((video) => (
            <Box
              key={video.id}
              onClick={() => handleSelect(video)}
              style={{
                cursor: 'pointer',
                padding: '20px',
                borderBottom: `5px solid ${theme.colors.gray[2]}`,
                backgroundColor: selectedItem === video.videoUrl ? theme.colors.blue[0] : 'transparent', // Highlight selected item
                }}
                >
                <Text className="subtitle" size="xl" style={{ color: selectedItem === video.videoUrl ? theme.colors.blue[9] : 'inherit' }}>{video.title}</Text>
                <Text className="subtitle" size="sm" style={{ color: theme.colors.gray[8] }}>{video.description}</Text>
                <Text className="subtitle" size="sm" style={{ color: theme.colors.gray[8], fontWeight: 'bold' }}>Muscle Groups: {video.muscleGroups}</Text>
            </Box>
          ))}
        </Box>
        {selectedItem && (
          <Box style={{ flex: 2 }}>
            <iframe
              src={selectedItem}
              title="YouTube Video"
              style={{ width: '100%', height: '700px', border: 'none', marginTop: '1rem' }} // Increased height
            />
          </Box>
        )}
      </Flex>
      <Box style={{ backgroundColor: theme.colors.gray[1], padding: '1rem', textAlign: 'center' }}>
      </Box>
    </Box>
  );
};

export default GymTutorials;