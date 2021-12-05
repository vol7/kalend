import React, { useContext } from 'react';
import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import LuxonHelper from '../../utils/luxonHelper';

interface DateWeekDayProps {
  isSelected?: boolean;
  width: number;
  day: DateTime;
}

const DateWeekDay = (props: DateWeekDayProps) => {
  const { isSelected, width, day } = props;

  const [store] = useContext(Context);
  const { isDark } = store;

  const isDayToday: boolean = LuxonHelper.isToday(day);

  return (
    <div className={'Calend__CalendarHeaderDates__col'} style={{ width }}>
      <div
        className={`Calend__CalendarHeaderDates__circle${
          isDayToday ? '-today' : ''
        }${isSelected ? '-selected' : ''}${isDark ? '-dark' : ''}`}
      >
        <p
          className={`Calend__text Calend__CalendarHeaderDates__text${
            isDayToday || isSelected ? '-today' : ''
          }${isDark ? '-dark' : ''}`}
        >
          {day.day}
        </p>
      </div>
    </div>
  );
};

export default DateWeekDay;
