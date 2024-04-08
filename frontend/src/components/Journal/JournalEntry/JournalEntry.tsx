import { Box, Flex, Grid, Text } from '@mantine/core'
import classes from './JournalEntry.module.css'
import { exercises } from '../../../utils/exercises'
import { IconInfoCircle } from '@tabler/icons-react'

export const EmptyJournalEntry = () => {
  return (
    <Box className={classes.container}>
      <Flex align="center" justify="center" h={'100%'}>
        <IconInfoCircle />
        <Text pl={'sm'}>No Entries Yet!</Text>
      </Flex>
    </Box>
  )
}

const JournalEntry = ({ entry }: { entry: JournalEntryType }) => {
  const exercise = exercises.find((item) => item.label === entry.exerciseType)
  return (
    <Box className={classes.container}>
      <Grid>
        <Grid.Col span={4}>
          <Flex align="center" justify="center" h={'100%'}>
            <exercise.icon />
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          <Flex align="center" justify="center" h={'100%'}>
            <Text>{entry.exerciseType}</Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          <Flex align="center" justify="center" h={'100%'}>
            <Text>{`${entry.totalDuration} minutes`}</Text>
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  )
}

export default JournalEntry
