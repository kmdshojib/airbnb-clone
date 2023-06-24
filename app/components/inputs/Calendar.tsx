"use client"
import React from 'react'
import { DateRange, Range, RangeKeyDict } from 'react-date-range'

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disableDates?: Date[];
}
const Calendar: React.FC<CalendarProps> = ({
  value, onChange, disableDates
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction='vertical'
      minDate={new Date()}
      showDateDisplay={false}
      disabledDates={disableDates}
    />
  )
}

export default Calendar;