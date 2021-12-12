import {
  CalendarEvent,
  OnEventClickFunc,
  OnEventDragFinishFunc,
  OnNewEventClickFunc,
} from '../../../common/interface';
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
  handleEventClick: OnEventClickFunc,
  day: DateTime,
  timezone: string,
  onEventDragFinish?: OnEventDragFinishFunc
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
          handleEventClick={handleEventClick}
          meta={item.meta}
          day={day}
          onEventDragFinish={onEventDragFinish}
        />
      );
    });
};

interface DaysViewOneDayProps {
  key: string;
  day: DateTime;
  index: number;
  handleNewEventClick: OnNewEventClickFunc;
  data: any;
  handleEventClick: OnEventClickFunc;
  onEventDragFinish?: OnEventDragFinishFunc;
}
const DaysViewOneDay = (props: DaysViewOneDayProps) => {
  const {
    day,
    index,
    data,
    handleNewEventClick,
    handleEventClick,
    onEventDragFinish,
  } = props;

  const [store] = useContext(Context);
  const { isDark, width, selectedView, hourHeight, timezone } = store;

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

  // const eventNodes: any = renderEvents(
  //   dataForDay,
  //   width,
  //   timezone,
  //   selectedView,
  //   hourHeight,
  //   handleEventClick,
  //   day,
  //   onEventDragFinish
  // );

  const handleEventClickInternal = (event: any) => {
    const rect: { top: number } = event.target.getBoundingClientRect();
    const y: number = event.clientY - rect.top;
    // Get hour from click event
    const hour: number = y / hourHeight;
    handleNewEventClick({ day: day.toJSDate(), hour, event });
  };

  return store.daysViewLayout?.[formatDateTimeToString(day)] ? (
    <div
      id={`Calend__day__${day.toString()}`}
      key={day.toString()}
      style={oneDayStyle}
      className={
        !isFirstDay
          ? parseCssDark(
              'Calend__DayViewOneDay Calend__DayViewOneDay__border-left',
              isDark
            )
          : 'Calend__DayViewOneDay'
      }
      onClick={handleEventClickInternal}
    >
      {dataForDay && dataForDay.length > 0
        ? renderEvents(
            dataForDay,
            handleEventClick,
            day,
            timezone,
            onEventDragFinish
          )
        : null}
    </div>
  ) : null;
};

export default DaysViewOneDay;
