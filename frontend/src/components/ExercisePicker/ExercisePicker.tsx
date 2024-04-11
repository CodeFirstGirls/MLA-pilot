import { useState } from 'react';
import React from 'react'; // Import React
import { UnstyledButton, Menu, Group, Text, Flex } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { exercises } from '../../utils/exercises';
import classes from './ExercisePicker.module.css';

interface ExercisePickerProps {
  setValue: (name: string, value: any) => void; // Adapt this based on your exact type signature for setValue
  name: string;
  exerciseTypes?: string[]; // Make this optional
}

const ExercisePicker = ({ setValue, name, exerciseTypes }: ExercisePickerProps) => {
  const [opened, setOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState(exercises[0].label); // Simplified state

  const handleSelect = (item) => {
    setSelectedItem(item.label || item); // Handle both categories and types
    setValue(name, item.label || item); // Use label for categories, direct value for types
    setOpened(false);
  };

  const renderItems = () => {
    const items = exerciseTypes || exercises; // Use provided types or fallback to categories
    return items.map((item) => (
      <Menu.Item
        onClick={() => handleSelect(item)}
        key={item.label || item}
      >
        <Group gap="xs">
          {item.icon && React.createElement(item.icon)}
          <span className={classes.label}>{item.label || item}</span>
        </Group>
      </Menu.Item>
    ));
  };

  return (
    <>
      <Flex justify="flex-start" w={'100%'} pt={'1rem'}>
        <Text className={classes.label}>Select Exercise</Text>
      </Flex>
      <Menu
        onOpen={() => setOpened(true)}
        onClose={() => setOpened(false)}
        radius="md"
        width="target"
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
            <Group gap="xs">
              {/* Assuming icons are React components */}
              <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
              <span className={classes.label}>{selectedItem}</span>
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          {renderItems()}
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ExercisePicker;