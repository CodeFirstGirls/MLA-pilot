type authData = {
  username: string
  password: string
}

type JournalEntryType = {
  exerciseType: string
  totalDuration: string
}

type ExerciseFormInputType = {
  exerciseDate: Date
  exerciseType: string
  exerciseDescription: string
  exerciseDuration: number | string
  exerciseSubcategory?: string
  sets?: number
  reps?: number
  weightLifted?: number

}

type ExerciseFormReqType = ExerciseFormInputType & { username: string }
