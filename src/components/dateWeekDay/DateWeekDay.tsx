import { CALENDAR_VIEW } from '../../common/enums';
import { Context } from '../../context/store';
import { DateWeekDayProps } from './DateWeekDay.props';
import { useContext } from 'react';
import LuxonHelper from '../../utils/luxonHelper';

const DateWeekDay = (props: DateWeekDayProps) => {
  const { width, day } = props;

  const [store] = useContext(Context);
  const { isDark, selectedView } = store;

  const isDayToday: boolean = LuxonHelper.isToday(day);

  const isMonthView: boolean = selectedView === CALENDAR_VIEW.MONTH;

  return (
    <div className={'Kalend__CalendarHeaderDates__col'} style={{ width }}>
      <div
        className={`Kalend__CalendarHeaderDates__circle${
          isMonthView ? '-small' : ''
        }${isDayToday ? '-today' : ''}${isDark ? '-dark' : ''}`}
      >
        <p
          className={`Kalend__text Kalend__CalendarHeaderDates__text${
            isDayToday ? '-today' : ''
          }${isDark ? '-dark' : ''} ${
            selectedView === CALENDAR_VIEW.MONTH
              ? 'Kalend__CalendarHeaderDates__text-size-small'
              : ''
          }`}
        >
          {day.day}
        </p>
      </div>
    </div>
  );
};

export default DateWeekDay;
