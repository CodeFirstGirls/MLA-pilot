import {

  IconBarbell,
  IconBike,
  IconQuestionMark,
  IconRun,
  IconSwimming,
  } from '@tabler/icons-react';
  
  export const exercises = [
  { label: 'Cycling', icon: IconBike, color: '#40C057' },
  { 
    label: 'Gym',
    types: [
      'Squat',
      'Bench Press',
      'Deadlift',
      'Overhead Press',
      'Bent Over Row',
      'Other Weightlifting',
    ],
    icon: IconBarbell,
    color: '#228BE6',
  },
  { label: 'Running', icon: IconRun, color: '#7950F2' },
  { label: 'Swimming', icon: IconSwimming, color: '#D2F250' },
  { label: 'Other', icon: IconQuestionMark, color: '#F243EB' },
  ];  