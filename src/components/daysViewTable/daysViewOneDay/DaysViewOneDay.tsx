import { CalendarEvent } from '../../../common/interface';
import { Context } from '../../../context/store';
import { DateTime } from 'luxon';
import { EVENT_TYPE } from '../../../common/enums';
import { formatDateTimeToString, parseCssDark } from '../../../utils/common';
import { getDaysNum } from '../../../utils/calendarDays';
import { parseToDateTime } from '../../../utils/dateTimeParser';
import { useContext, useEffect } from 'react';
import EventButton from '../../eventButton/EventButton';
import LuxonHelper from '../../../utils/luxonHelper';

const renderEvents = (
  dataset: CalendarEvent[],
  day: DateTime,
  timezone: string
) => {
  return dataset
    .filter((item: CalendarEvent) => {
      if (!item.allDay) {
        const daysDiff: number = parseToDateTime(
          item.endAt,
          item.timezoneStartAt || timezone
        ).diff(
          parseToDateTime(item.startAt, item.timezoneStartAt || timezone)
        ).days;
        if (daysDiff < 1) {
          return item;
        }
      }
    })
    .map((item: any) => {
      return (
        <EventButton
          key={item.id}
          event={item}
          type={EVENT_TYPE.NORMAL}
          meta={item.meta}
          day={day}
        />
      );
    });
};

interface DaysViewOneDayProps {
  key: string;
  day: DateTime;
  index: number;
  data: any;
}
const DaysViewOneDay = (props: DaysViewOneDayProps) => {
  const { day, index, data } = props;

  const [store] = useContext(Context);
  const { width, selectedView, config, callbacks } = store;
  const { onNewEventClick } = callbacks;
  const { isDark, hourHeight, timezone } = config;

  const oneDayStyle: any = {
    width: width / getDaysNum(selectedView),
    height: hourHeight * 24,
  };

  const isToday: boolean = LuxonHelper.isToday(day);
  const isFirstDay: boolean = index === 0;
  const dataForDay: any = data;

  const dateNow: any = DateTime.local();

  const nowPosition: number =
    dateNow
      .diff(DateTime.local().set({ hour: 0, minute: 0, second: 0 }), 'minutes')
      .toObject().minutes /
    (60 / hourHeight);

  useEffect(() => {
    if (isToday) {
      const elements: any = document.querySelectorAll(
        '.calendar-body__wrapper'
      );

      for (const element of elements) {
        element.scrollTo({ top: nowPosition - 40, behavior: 'smooth' });
      }
    }
  }, []);

  const handleEventClickInternal = (event: any) => {
    if (onNewEventClick) {
      const rect: { top: number } = event.target.getBoundingClientRect();
      const y: number = event.clientY - rect.top;
      // Get hour from click event
      const hour: number = y / hourHeight;
      onNewEventClick({ day: day.toJSDate(), hour, event });
    }
  };

  return store.daysViewLayout?.[formatDateTimeToString(day)] ? (
    <div
      id={`Kalend__day__${day.toString()}`}
      key={day.toString()}
      style={oneDayStyle}
      className={
        !isFirstDay
          ? parseCssDark('Kalend__DayViewOneDay', isDark)
          : 'Kalend__DayViewOneDay'
      }
      onClick={handleEventClickInternal}
    >
      {dataForDay && dataForDay.length > 0
        ? renderEvents(dataForDay, day, timezone)
        : null}
    </div>
  ) : null;
};

export default DaysViewOneDay;
