import React from 'react';
import { DateTime } from 'luxon';

interface DayOfWeekTextProps {
  width: number;
  day: DateTime;
}

const DayOfWeekText = (props: DayOfWeekTextProps) => {
  const { width, day } = props;

  return (
    <div className={'Calend__CalendarHeaderWeekDays__col'} style={{ width }}>
      <p className={'Calend__text Calend__CalendarHeaderWeekDays__text'}>
        {day.toFormat('EEE')}
      </p>
    </div>
  );
};

export default DayOfWeekText;
