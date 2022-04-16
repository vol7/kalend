import { CALENDAR_VIEW } from '../../common/enums';
import { Context } from '../../context/store';
import { DateWeekDayProps } from './DateWeekDay.props';
import { useContext } from 'react';
import LuxonHelper from '../../utils/luxonHelper';

const DateWeekDay = (props: DateWeekDayProps) => {
  const { width, day } = props;

  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { selectedView, style, callbacks } = store;

  const isDayToday: boolean = LuxonHelper.isToday(day);

  const isMonthView: boolean = selectedView === CALENDAR_VIEW.MONTH;

  const navigateToDay = (e: any) => {
    if (props.setViewChanged) {
      e.preventDefault();
      e.stopPropagation();

      props.setViewChanged(CALENDAR_VIEW.DAY);
      setContext('selectedDate', day);
      setContext('calendarDays', [day]);
    }
  };

  const handleNewEventClick = (event: any) => {
    if (callbacks.onNewEventClick) {
      callbacks.onNewEventClick(
        {
          day: day.toJSDate(),
          hour: day.toUTC().hour,
          startAt: day
            ?.setZone(store.config.timezone)
            .startOf('day')
            .toUTC()
            .toString(),
          endAt: day
            ?.setZone(store.config.timezone)
            .endOf('day')
            .toUTC()
            .toString(),
          event,
          view: selectedView,
        },
        event
      );
    }
  };

  return (
    <div
      className={'Kalend__CalendarHeaderDates__col'}
      style={{ width, cursor: props.setViewChanged ? 'pointer' : 'normal' }}
      onClick={handleNewEventClick}
    >
      <div
        className={`Kalend__CalendarHeaderDates__circle${
          isMonthView ? '-small' : ''
        }`}
        onClick={navigateToDay}
        style={{
          background: isDayToday ? style.primaryColor : 'transparent',
          width: 28,
          height: 28,
        }}
      >
        <p
          className={`Kalend__text Kalend__CalendarHeaderDates__text ${
            selectedView === CALENDAR_VIEW.MONTH
              ? 'Kalend__CalendarHeaderDates__text-size-small'
              : ''
          }`}
          style={{
            color: isDayToday ? style.inverseBaseColor : style.baseColor,
          }}
        >
          {day.day}
        </p>
      </div>
    </div>
  );
};

export default DateWeekDay;
