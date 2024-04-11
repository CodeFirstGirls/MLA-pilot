'use client'
import {
  Flex,
  Title,
  Textarea,
  Button,
  Alert,
  NumberInput,
  rem,
} from '@mantine/core';
import { useState, useContext } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { IconAlertCircle } from '@tabler/icons-react';

import Spinner from '../Spinner';
import { getCurrentUser } from '../../utils/sessionStorage';
import { addExercise } from '../../utils/requests';
import classes from './AddExerciseModal.module.css';
import ExercisePicker from '../ExercisePicker/ExercisePicker';
import { UpdateContext } from '../../context/UpdateContextProvider';
import { exercises } from '../../utils/exercises';

const errorIcon = (
  <IconAlertCircle style={{ width: rem(18), height: rem(18) }} stroke={2} />
);

export const AddExercieModalTitle = () => {
  return (
    <Title order={2} className={classes.title}>
      Add Exercise
    </Title>
  );
};

const AddExerciseModal = ({ close }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const { forceUpdate } = useContext(UpdateContext);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<ExerciseFormInputType>({
    defaultValues: {
      exerciseDate: new Date(new Date().setHours(0, 0, 0, 0)),
      exerciseType: exercises[0].label,
      exerciseSubcategory: '',
      exerciseDescription: '',
      sets: 0,
      reps: 0,
      weightLifted: 0,
    },
  });

  const onSubmit: SubmitHandler<ExerciseFormInputType> = async (data) => {
    setError(false);
    setSubmitting(true);
    const response = await addExercise({
      ...data,
      username: getCurrentUser() || '',
    });
    if (response.success === true) {
      setSubmitting(false);
      forceUpdate();
      close();
    } else {
      setSubmitting(false);
      setError(true);
    }
  };

  const exerciseTypeWatch = watch('exerciseType');

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
        {exerciseTypeWatch === 'Gym' && (
          <>
            <Controller
              name="exerciseSubcategory"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                // Pass the gym types to the ExercisePicker for rendering
                <ExercisePicker
                  {...register('exerciseSubcategory')}
                  setValue={setValue}
                  exerciseTypes={exercises.find(ex => ex.label === 'Gym')?.types}
                />
              )}
            />
            <Controller
              name="sets"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  label="Sets Count"
                  min={1}
                  error={errors.sets ? 'Invalid sets count' : false}
                  pt={'1rem'}
                  w={'100%'}
                />
              )}
            />
            <Controller
              name="reps"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  label="Reps Count"
                  min={1}
                  error={errors.reps ? 'Invalid reps count' : false}
                  pt={'1rem'}
                  w={'100%'}
                />
              )}
            />
            <Controller
              name="weightLifted"
              control={control}
              rules={{ required: true, min: 0 }}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  label="Weight Lifted (kgs)"
                  min={0}
                  error={errors.weightLifted ? 'Invalid weight' : false}
                  pt={'1rem'}
                  w={'100%'}
                />
              )}
            />
          </>
        )}
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
  );
};

export default AddExerciseModal;