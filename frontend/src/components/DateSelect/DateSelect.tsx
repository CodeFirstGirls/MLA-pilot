import { DatePicker } from '@mantine/dates'
import { Button, Modal, Flex, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconCalendarWeek } from '@tabler/icons-react'
import { useState } from 'react'

type DateSelectProps = {
  value: [Date | null, Date | null]
  setValue: (value: [Date | null, Date | null]) => void
}

const DateSelect = ({ value, setValue }: DateSelectProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [interalValue, setInternalValue] =
    useState<[Date | null, Date | null]>(value)
  const onChange = (val: [Date | null, Date | null]) => {
    setValue(val)
    if (val[0] !== null && val[1] !== null) {
      setInternalValue(val)
      close()
    }
  }
  return (
    <>
      <Modal opened={opened} onClose={close}>
        <DatePicker
          value={value}
          onChange={onChange}
          type="range"
          allowSingleDateInRange
        />
      </Modal>
      <Button onClick={open} h={'fit-content'} bg={'transparent'}>
        <Flex
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap"
          w={'fit-content'}
        >
          <IconCalendarWeek size={24} />

          <Text fw={600} w={'fit-content'}>
            {value[1] &&
              `${value[0].getDate()}/${value[0].getMonth() + 1} - ${value[1].getDate()}/${value[1].getMonth() + 1}`}
          </Text>
        </Flex>
      </Button>
    </>
  )
}

export default DateSelect
