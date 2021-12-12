import { Context } from '../../context/store';
import { DateWeekDayProps } from './DateWeekDay.props';
import { useContext } from 'react';
import LuxonHelper from '../../utils/luxonHelper';

const DateWeekDay = (props: DateWeekDayProps) => {
  const { isSelected, width, day } = props;

  const [store] = useContext(Context);
  const { isDark } = store;

  const isDayToday: boolean = LuxonHelper.isToday(day);

  return (
    <div className={'Kalend__CalendarHeaderDates__col'} style={{ width }}>
      <div
        className={`Kalend__CalendarHeaderDates__circle${
          isDayToday ? '-today' : ''
        }${isSelected ? '-selected' : ''}${isDark ? '-dark' : ''}`}
      >
        <p
          className={`Kalend__text Kalend__CalendarHeaderDates__text${
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
