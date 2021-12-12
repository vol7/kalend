import { CALENDAR_OFFSET_LEFT } from '../../common/constants';
import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { DaysViewTableProps } from './DaysViewTable.props';
import {
  NormalEventPosition,
  OnEventClickFunc,
  OnEventDragFinishFunc,
  OnNewEventClickFunc,
} from '../../common/interface';
import { calculateDaysViewLayout } from '../../utils/eventLayout';
import { calculatePositionForHeaderEvents } from '../calendarHeader/calendarHeaderEvents/CalendarHeaderEvents.utils';
import { formatDateTimeToString } from '../../utils/common';
import { useContext, useEffect } from 'react';
import CalendarBodyHours from './daysViewOneDay/calendarBodyHours/CalendarBodyHours';
import DaysViewOneDay from './daysViewOneDay/DaysViewOneDay';

const renderOneDay = (
  calendarDays: DateTime[],
  handleNewEventClick: OnNewEventClickFunc,
  events: any,
  handleEventClick: OnEventClickFunc,
  onEventDragFinish?: OnEventDragFinishFunc
) => {
  return calendarDays.map((calendarDay: DateTime, index: number) => {
    const formattedDayString: string = formatDateTimeToString(calendarDay);

    return (
      <DaysViewOneDay
        key={calendarDay.toString()}
        day={calendarDay}
        index={index}
        data={events ? events[formattedDayString] : []}
        handleNewEventClick={handleNewEventClick}
        handleEventClick={handleEventClick}
        onEventDragFinish={onEventDragFinish}
      />
    );
  });
};

const DaysViewTable = (props: DaysViewTableProps) => {
  const { handleNewEventClick, handleEventClick, onEventDragFinish, events } =
    props;

  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { hourHeight, calendarDays, width, height, timezone, selectedView } =
    store;

  const days: any = renderOneDay(
    calendarDays,
    handleNewEventClick,
    events,
    handleEventClick,
    onEventDragFinish
  );

  const style: any = {
    paddingLeft: CALENDAR_OFFSET_LEFT,
    width,
    height: height,
  };

  const adjustScrollPosition = () => {
    const currentElement: any = document.getElementById(`Calend__timetable`);

    currentElement.scrollTop = DateTime.now().hour * hourHeight - hourHeight;
  };

  useEffect(() => {
    adjustScrollPosition();
  }, []);

  // const onPageChange = async (isGoingForward?: boolean) => {
  //   await getNewCalendarDays(calendarDays, selectedView, isGoingForward);
  // };

  // recalculate event positions on calendarDays change
  useEffect(() => {
    const positions: any = calculateDaysViewLayout(
      calendarDays,
      events,
      width,
      timezone,
      hourHeight,
      selectedView
    );

    setContext('daysViewLayout', positions);
  }, [calendarDays[0]]);
  useEffect(() => {
    const positions: any = calculateDaysViewLayout(
      calendarDays,
      events,
      width,
      timezone,
      hourHeight,
      selectedView
    );

    setContext('daysViewLayout', positions);
    // recalculate positions
    const eventPositions: NormalEventPosition[][] =
      calculatePositionForHeaderEvents(
        events,
        width / calendarDays.length,
        calendarDays,
        setContext
      );
    setContext('headerLayout', eventPositions);

    setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);
  }, [JSON.stringify(events)]);

  useEffect(() => {
    const positions: any = calculateDaysViewLayout(
      calendarDays,
      events,
      width,
      timezone,
      hourHeight,
      selectedView
    );

    setContext('daysViewLayout', positions);
  }, []);

  return (
    // <Carousel onPageChange={onPageChange}>
    <div
      style={style}
      className={'Calend__CalendarBody'}
      id={`Calend__timetable`}
      // onScroll={handleScroll}
    >
      <CalendarBodyHours />
      {days}
    </div>
    // </Carousel>
  );
};

export default DaysViewTable;
