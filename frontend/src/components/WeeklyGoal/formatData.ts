import { exercises } from '../../utils/exercises'

const formatData = (data: any, weeklyGoal: number | string) => {
  const formattedData = data.map((entry: any) => {
    return {
      exerciseType: entry.exerciseType,
      value: (entry.totalDuration / Number(weeklyGoal)) * 100,
      color: exercises.find((item) => item.label === entry.exerciseType).color,
      icon: exercises.find((item) => item.label === entry.exerciseType).icon,
    }
  })
  return formattedData
}

export default formatData
