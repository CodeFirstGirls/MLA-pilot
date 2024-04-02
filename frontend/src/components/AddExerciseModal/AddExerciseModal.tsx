'use client'
import {
  Flex,
  Title,
  Textarea,
  Button,
  Alert,
  NumberInput,
  rem,
} from '@mantine/core'
import { useState, useContext } from 'react'
import { DatePickerInput } from '@mantine/dates'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IconAlertCircle } from '@tabler/icons-react'

import Spinner from '../Spinner'
import { getCurrentUser } from '../../utils/sessionStorage'
import { exercises } from '../../utils/exercises'
import { addExercise } from '../../utils/requests'
import classes from './AddExerciseModal.module.css'
import ExercisePicker from '../ExercisePicker/ExercisePicker'
import { UpdateContext } from '../../context/UpdateContextProvider'

const errorIcon = (
  <IconAlertCircle style={{ width: rem(18), height: rem(18) }} stroke={2} />
)

export const AddExercieModalTitle = () => {
  return (
    <Title order={2} className={classes.title}>
      Add Exercise
    </Title>
  )
}

const AddExerciseModal = ({ close }) => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const { forceUpdate } = useContext(UpdateContext)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ExerciseFormInputType>({
    defaultValues: {
      exerciseDate: new Date(new Date().setHours(0, 0, 0, 0)),
      exerciseType: exercises[0].label,
      exerciseDescription: '',
    },
  })

  const onSubmit: SubmitHandler<ExerciseFormInputType> = async (data) => {
    setError(false)
    setSubmitting(true)
    const response = await addExercise({ ...data, username: getCurrentUser() })
    if (response.success === true) {
      setSubmitting(false)
      forceUpdate()
      close()
    } else {
      setSubmitting(false)
      setError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction={'column'} align={'center'} justify={'center'}>
        <Controller
          name="exerciseDate"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <DatePickerInput
              label="Pick date"
              placeholder="Pick date"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              dropdownType="modal"
              w={'100%'}
            />
          )}
        />
        <Controller
          name="exerciseType"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <ExercisePicker {...register('exerciseType')} setValue={setValue} />
          )}
        />
        <Controller
          name="exerciseDescription"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Textarea
              resize="vertical"
              label="Description"
              placeholder="Your comment"
              pt={'1rem'}
              w={'100%'}
              value={value}
              onChange={onChange}
              error={errors.exerciseDescription ? 'Invalid Description' : false}
            />
          )}
        />
        <Controller
          name="exerciseDuration"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <NumberInput
              label="Duration"
              suffix=" minutes"
              value={value}
              pt={'1rem'}
              w={'100%'}
              onChange={onChange}
              error={errors.exerciseDuration ? 'Invalid Duration' : false}
            />
          )}
        />
      </Flex>
      {error && (
        <Alert
          variant="light"
          color="orange"
          title="There was an error adding your exercise! Please try again."
          icon={errorIcon}
          mb={'1rem'}
          mt={'1rem'}
        ></Alert>
      )}
      <Button
        size="md"
        fullWidth
        className={classes.loginButton}
        type="submit"
        mt={'1rem'}
      >
        {submitting ? <Spinner /> : 'Submit'}
      </Button>
    </form>
  )
}

export default AddExerciseModal
