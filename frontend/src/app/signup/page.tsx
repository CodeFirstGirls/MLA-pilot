import {
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Stack,
  Flex,
} from '@mantine/core'

import classes from './page.module.css'
import AuthForm from '../../components/AuthForm/AuthForm'
import { signupRequest } from '../../utils/requests'

const signUpPage = () => {
  return (
    <Container size={500} pt={'10vh'}>
      <Flex justify="center" align="center" direction="column">
        <Title ta="center" className={classes.title} c="white" order={1}>
          CFG Fitness Tracker
        </Title>
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={'8vh'}
          radius="md"
          maw={420}
          w={'100%'}
        >
          <Stack>
            <Title ta="center" order={2}>
              Sign Up
            </Title>
            <AuthForm
              buttonText="Sign Up"
              submitAction={signupRequest}
              dataQaIdPrefix="signUp"
            />
            <Text c="dimmed" size="sm" ta="center" pt="20px">
              Already have an account?{' '}
              <Anchor size="sm" href="/login" c="#FD6580">
                Log In Here
              </Anchor>
            </Text>
          </Stack>
        </Paper>
      </Flex>
    </Container>
  )
}

export default signUpPage
