'use client'
import { Container, Grid, SimpleGrid, rem } from '@mantine/core'
import Journal from '../Journal'
import Progress from '../Progress'
import WeeklyGoal from '../WeeklyGoal'

const PRIMARY_COL_HEIGHT = rem(600)

const HomepageGrid = () => {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`

  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        <Journal height={PRIMARY_COL_HEIGHT} />
        <Grid gutter="md">
          <Grid.Col>
            <Progress height={SECONDARY_COL_HEIGHT} />
          </Grid.Col>
          <Grid.Col>
            <WeeklyGoal height={SECONDARY_COL_HEIGHT} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  )
}

export default HomepageGrid
