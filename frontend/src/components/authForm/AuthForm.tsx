'use client'
import { TextInput, PasswordInput, Button, Alert, rem } from '@mantine/core'
import { IconLock, IconUser, IconAlertCircle } from '@tabler/icons-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

import { ErrorContext } from '../../context/ErrorContextProvider'
import classes from './AuthForm.module.css'
import Spinner from '../Spinner'
import { setCurrentUser } from '../../utils/sessionStorage'

const lockIcon = (
  <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
)
const userIcon = (
  <IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
)
const errorIcon = (
  <IconAlertCircle style={{ width: rem(18), height: rem(18) }} stroke={2} />
)

interface IFormInput {
  username: string
  password: string
}

const AuthForm = ({
  buttonText,
  submitAction,
  dataQaIdPrefix,
}: {
  buttonText: string
  submitAction: Function
  dataQaIdPrefix: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const { error, errorMessage, setError, clearError } = useContext(ErrorContext)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    clearError()
    setSubmitting(true)
    const response = await submitAction(data)
    if (response.success === true) {
      setCurrentUser(data.username)
      setSubmitting(false)
      router.push('/')
    } else {
      setSubmitting(false)
      setError(response.error)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Username"
        placeholder="Your username"
        error={errors.username ? 'Invalid username' : false}
        leftSection={userIcon}
        {...register('username', { required: true })}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        error={errors.password ? 'Invalid password' : false}
        mt="md"
        mb="md"
        leftSection={lockIcon}
        {...register('password', { required: true })}
      />
      {error && (
        <Alert
          variant="light"
          color="orange"
          title={errorMessage}
          icon={errorIcon}
          mb={'1rem'}
        ></Alert>
      )}
      <Button size="md" fullWidth className={classes.loginButton} type="submit">
        {submitting ? <Spinner /> : buttonText}
      </Button>
    </form>
  )
}

export default AuthForm
