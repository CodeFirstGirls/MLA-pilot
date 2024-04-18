'use client'
import {
  Box,
  Grid,
  Title,
  Flex,
  RingProgress,
  Alert,
  Text,
  Center,
  rem,
  ActionIcon,
  Modal,
  NumberInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState, useEffect, useContext } from 'react'
import { IconInfoCircle, IconEdit, IconCheck } from '@tabler/icons-react'
import moment from 'moment'

import { getCurrentUser } from '../../utils/sessionStorage'
import { UpdateContext } from '../../context/UpdateContextProvider'
import classes from './WeeklyGoal.module.css'
import { fetchExercises } from '../../utils/requests'
import Spinner from '../Spinner'
import formatData from './formatData'

const WeeklyGoal = ({ height }) => {
  const [value, setValue] = useState<[Date | null, Date | null]>([
    moment().startOf('week').toDate(),
    moment().endOf('week').toDate(),
  ])
  const [data, setData] = useState([])
  const [formattedData, setFormattedData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [weeklyGoal, setWeeklyGoal] = useState<string | number>(200)
  const { update } = useContext(UpdateContext)
  const [opened, { open, close }] = useDisclosure(false)

  useEffect(() => {
    setFormattedData(formatData(data, weeklyGoal))
  }, [data, weeklyGoal])

  useEffect(() => {
    if (getCurrentUser != null) {
      setLoading(true)
      setError(false)
      fetchExercises(value[0], value[1], getCurrentUser()).then((data) => {
        if (data === undefined) {
          setData([])
          setError(true)
        } else {
          setData(data)
        }
        setLoading(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, getCurrentUser(), update])

  const Labels =
    formattedData.length != 0 ? (
      formattedData.map((item, index) => (
        <Flex direction="row" align="center" mb={'1rem'} key={index}>
          <span
            style={{ backgroundColor: item.color }}
            className={classes.dot}
          ></span>
          <Text pl={'sm'} c="white">
            {item.exerciseType}
          </Text>
        </Flex>
      ))
    ) : (
      <Flex direction="row" align="center" mb={'1rem'} key={'emptyGoals'}>
        <span
          style={{ backgroundColor: 'white' }}
          className={classes.dot}
        ></span>
        <Text pl={'sm'} c="white">
          No exercises recorded
        </Text>
      </Flex>
    )

  return (
    <>
      <Modal opened={opened} onClose={close} size="sm">
        <Flex direction="column" align="center" justify="center">
          <Title order={3} className={classes.modalTitle}>
            What is your weekly goal?
          </Title>
          <NumberInput
            pt={'md'}
            value={weeklyGoal}
            onChange={setWeeklyGoal}
            placeholder="Enter your weekly goal"
            required
            variant="filled"
            classNames={{ input: classes.modalInput }}
            label={'Weekly Goal in minutes'}
          />
        </Flex>
      </Modal>

      <Box className={classes.container} h={height}>
        <Grid justify="center">
          <Grid.Col span={{ base: 1, sm: 2, md: 2 }}></Grid.Col>
          <Grid.Col span={{ base: 5, sm: 8, md: 8 }} h={'5rem'}>
            <Flex align={'center'} h={'100%'} w={'100%'} justify={'center'}>
              <Title order={2} className={classes.title}>
                Weekly Goal
              </Title>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 1, sm: 2, md: 2 }}>
            <Flex align={'center'} h={'100%'} w={'100%'} justify={'center'}>
              <ActionIcon variant="transparent" size={36} onClick={open}>
                <IconEdit size={24} color="white" />
              </ActionIcon>
            </Flex>
          </Grid.Col>
        </Grid>

        {loading ? (
          <Flex direction="column" align="center" justify="center">
            <Spinner />
          </Flex>
        ) : !error ? (
          <Grid w={'100%'} h={'100%'} classNames={{ inner: classes.innerGrid }}>
            <Grid.Col span={6}>
              <Flex
                direction="column"
                align="center"
                justify="center"
                w={'100%'}
                h={'100%'}
              >
                {formattedData
                  .reduce((acc, item) => acc + item.value, 0)
                  .toFixed(0) > 100 ? (
                  <RingProgress
                    sections={[{ value: 100, color: 'teal' }]}
                    label={
                      <Center>
                        <IconCheck
                          size={24}
                          color="white"
                          style={{
                            width: rem(22),
                            height: rem(22),
                            strokeWidth: 4,
                          }}
                        />
                      </Center>
                    }
                  />
                ) : (
                  <RingProgress
                    size={120}
                    thickness={12}
                    roundCaps
                    sections={formattedData}
                    label={
                      <Text c="white" fw={700} ta="center" size="xl">
                        {formattedData
                          .reduce((acc, item) => acc + item.value, 0)
                          .toFixed(0)}
                        %
                      </Text>
                    }
                  />
                )}
              </Flex>
            </Grid.Col>
            <Grid.Col span={6}>
              <Flex
                direction={'column'}
                justify={'center'}
                w={'100%'}
                h={'100%'}
              >
                {Labels}
              </Flex>
            </Grid.Col>
          </Grid>
        ) : (
          <Flex direction="column" align="center" justify="center">
            <Alert
              variant="light"
              color="white"
              title="An error occurred"
              icon={<IconInfoCircle />}
              classNames={{
                root: classes.alertRoot,
                message: classes.alertMessage,
              }}
              w={'80%'}
            >
              Looks like there was an error fetching your data. Please try
              refreshing the page.
            </Alert>
          </Flex>
        )}
      </Box>
    </>
  )
}

export default WeeklyGoal
