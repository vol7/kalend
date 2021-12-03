import React, { useContext, useEffect } from 'react';
import { DateTime } from 'luxon';
import { parseCssDark } from '../../../utils/common';
import {
  CalendarEvent,
  Config,
  NewEventClickData,
  NormalEventPosition,
} from '../../../common/interface';
import LuxonHelper from '../../../utils/luxonHelper';
import { CALENDAR_VIEW, EVENT_TYPE } from '../../../common/enums';
import { calculateNormalEventPositions } from '../../../utils/eventLayout';
import EventButton from '../../eventButton/EventButton';
import { getDaysNum } from '../../../utils/calendarDays';
import { Context } from '../../../context/store';

const renderEvents = (
  dataset: Event[],
  baseWidth: number,
  defaultTimezone: string,
  selectedView: CALENDAR_VIEW,
  hourHeight: number,
  handleEventClick: (data: CalendarEvent) => void
) => {
  const calculatedResults: NormalEventPosition[] =
    calculateNormalEventPositions(
      dataset,
      baseWidth,
      defaultTimezone,
      hourHeight,
      selectedView
    );

  return calculatedResults.map((item: NormalEventPosition) => (
    <EventButton
      key={item.event.id}
      height={item.height}
      offsetTop={item.offsetTop}
      eventWidth={item.width}
      offsetLeft={item.offsetLeft}
      event={item.event}
      type={EVENT_TYPE.NORMAL}
      handleEventClick={handleEventClick}
      zIndex={item.zIndex}
      meta={item.meta}
    />
  ));
};

interface DaysViewOneDayProps {
  key: string;
  day: DateTime;
  index: number;
  handleNewEventClick: (data: NewEventClickData) => void;
  data: any;
  handleEventClick: (data: CalendarEvent) => void;
}
const DaysViewOneDay = (props: DaysViewOneDayProps) => {
  const { day, index, data, handleNewEventClick, handleEventClick } = props;

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

  const eventNodes: any = renderEvents(
    dataForDay,
    width,
    timezone,
    selectedView,
    hourHeight,
    handleEventClick
  );

  const handleEventClickInternal = (event: any) => {
    const rect: { top: number } = event.target.getBoundingClientRect();
    const y: number = event.clientY - rect.top;
    // Get hour from click event
    const hour: number = y / hourHeight;
    handleNewEventClick({ day: day.toJSDate(), hour, event });
  };

  return (
    <div
      key={day.toString()}
      style={oneDayStyle}
      className={
        !isFirstDay
          ? parseCssDark('DayViewOneDay DayViewOneDay__border-left', isDark)
          : 'DayViewOneDay'
      }
      onClick={handleEventClickInternal}
    >
      {dataForDay && dataForDay.length > 0 ? eventNodes : null}
    </div>
  );
};

export default DaysViewOneDay;
