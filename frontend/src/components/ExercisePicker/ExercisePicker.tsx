import { useState } from 'react'
import { UnstyledButton, Menu, Group, Text, Flex, Box } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { exercises } from '../../utils/exercises'
import classes from './ExercisePicker.module.css'

const ExercisePicker = ({ setValue, name }) => {
  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState(exercises[0])

  const setSelectedWider = (value) => {
    setSelected(value)
    setValue(name, value.label)
  }

  const items = exercises.map((item) => (
    <Menu.Item
      leftSection={<item.icon />}
      onClick={() => setSelectedWider(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ))

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
          <UnstyledButton
            className={classes.control}
            data-expanded={opened || undefined}
          >
            <Group gap="xs">
              <selected.icon />
              <span className={classes.label}>{selected.label}</span>
            </Group>
            <IconChevronDown
              size="1rem"
              className={classes.icon}
              stroke={1.5}
            />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>{items}</Menu.Dropdown>
      </Menu>
    </>
  )
}
export default ExercisePicker
