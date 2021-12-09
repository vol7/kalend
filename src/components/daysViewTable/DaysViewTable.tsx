import { CALENDAR_OFFSET_LEFT } from '../../common/constants';
import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { DaysViewTableProps } from './DaysViewTable.props';
import {
  OnEventClickFunc,
  OnEventDragFinishFunc,
  OnNewEventClickFunc,
} from '../../common/interface';
import { formatTimestampToDate } from '../../utils/common';
import { useContext, useEffect } from 'react';
import CalendarBodyHours from './daysViewOneDay/calendarBodyHours/CalendarBodyHours';
import DaysViewOneDay from './daysViewOneDay/DaysViewOneDay';

const renderOneDay = (
  calendarDays: DateTime[],
  handleNewEventClick: OnNewEventClickFunc,
  events: any,
  handleEventClick: OnEventClickFunc,
  onEventDragFinish?: OnEventDragFinishFunc
) =>
  calendarDays.map((day: DateTime, index: number) => {
    const formattedDayString: string = formatTimestampToDate(day);

    return (
      <DaysViewOneDay
        key={day.toString()}
        day={day}
        index={index}
        data={events ? events[formattedDayString] : []}
        handleNewEventClick={handleNewEventClick}
        handleEventClick={handleEventClick}
        onEventDragFinish={onEventDragFinish}
      />
    );
  });

const DaysViewTable = (props: DaysViewTableProps) => {
  const { handleNewEventClick, handleEventClick, events, onEventDragFinish } =
    props;

  const [store] = useContext(Context);
  const { hourHeight, calendarDays, width, height } = store;

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
    height: height, //- headerEventRowsCount * 22,
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
