'use client'
import {
  Box,
  Grid,
  Title,
  Flex,
  Center,
  Group,
  ActionIcon,
  Alert,
} from '@mantine/core'
import { useState, useEffect, useContext } from 'react'
import {
  IconArrowLeft,
  IconArrowRight,
  IconInfoCircle,
} from '@tabler/icons-react'

import { UpdateContext } from '../../context/UpdateContextProvider'
import DateSelect from '../DateSelect'
import classes from './Journal.module.css'
import { fetchExercises } from '../../utils/requests'
import JournalEntry, { EmptyJournalEntry } from './JournalEntry'
import Spinner from '../Spinner'
import moment from 'moment'
import { getCurrentUser } from '../../utils/sessionStorage'

const Journal = ({ height }) => {
  const defaultDateValue = new Date()
  defaultDateValue.setDate(defaultDateValue.getDate() - 7)
  const [value, setValue] = useState<[Date | null, Date | null]>([
    moment().subtract(7, 'days').toDate(),
    new Date(),
  ])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { update } = useContext(UpdateContext)
  const incrementDate = () => {
    const newStartDate = moment(value[0]).add(7, 'days').toDate()
    const newEndDate = moment(newStartDate).add(7, 'days').toDate()
    setValue([newStartDate, newEndDate])
  }
  const decrementDate = () => {
    const newStartDate = moment(value[0]).subtract(7, 'days').toDate()
    const newEndDate = moment(newStartDate).add(7, 'days').toDate()
    setValue([newStartDate, newEndDate])
  }

  const JournalEntries =
    data.length != 0 ? (
      data.map((item, index) => {
        return <JournalEntry entry={item} key={index} />
      })
    ) : (
      <EmptyJournalEntry />
    )

  useEffect(() => {
    if (value[1] != null && getCurrentUser() != null) {
      // date picker sets 2 values (start and end date) so we need to check if the end date is not null before making the req
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

  return (
    <Box className={classes.container} h={height}>
      <Grid justify="center">
        <Grid.Col span={{ base: 0, sm: 1, md: 4 }}></Grid.Col>
        <Grid.Col span={{ base: 5, sm: 5, md: 4 }} h={'8rem'}>
          <Flex align={'center'} h={'100%'} w={'100%'} justify={'center'}>
            <Title order={2} className={classes.title}>
              Journal
            </Title>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 5, md: 4 }}>
          <Flex align={'center'} h={'100%'} w={'100%'} justify={'center'}>
            <DateSelect value={value} setValue={setValue} />
          </Flex>
        </Grid.Col>
      </Grid>
      <Center>
        <hr className={classes.horizontalDivider} />
      </Center>

      <Flex direction="column" align="center">
        {loading ? <Spinner /> : JournalEntries}
        {error && (
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
        )}
      </Flex>
      <Group className={classes.navArrowsGroup}>
        <ActionIcon variant="transparent" size={36} onClick={decrementDate}>
          <IconArrowLeft size={36} color="white" />
        </ActionIcon>
        <ActionIcon variant="transparent" size={36} onClick={incrementDate}>
          <IconArrowRight size={36} color="white" />
        </ActionIcon>
      </Group>
    </Box>
  )
}

export default Journal
