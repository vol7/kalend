import { CALENDAR_OFFSET_LEFT } from '../../common/constants';
import {
  CalendarDay,
  OnEventClickFunc,
  OnEventDragFinishFunc,
  OnNewEventClickFunc,
} from '../../common/interface';
import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { DaysViewTableProps } from './DaysViewTable.props';
import { formatDateTimeToString } from '../../utils/common';
import { useContext, useEffect } from 'react';
import CalendarBodyHours from './daysViewOneDay/calendarBodyHours/CalendarBodyHours';
import DaysViewOneDay from './daysViewOneDay/DaysViewOneDay';

const renderOneDay = (
  calendarDays: CalendarDay[],
  handleNewEventClick: OnNewEventClickFunc,
  events: any,
  handleEventClick: OnEventClickFunc,
  onEventDragFinish?: OnEventDragFinishFunc
) =>
  calendarDays.map((calendarDay: CalendarDay, index: number) => {
    const formattedDayString: string = formatDateTimeToString(calendarDay.date);

    return (
      <DaysViewOneDay
        key={calendarDay.id}
        day={calendarDay.date}
        index={index}
        data={events ? events[formattedDayString] : []}
        handleNewEventClick={handleNewEventClick}
        handleEventClick={handleEventClick}
        onEventDragFinish={onEventDragFinish}
      />
    );
  });

const DaysViewTable = (props: DaysViewTableProps) => {
  const { handleNewEventClick, handleEventClick, onEventDragFinish, events } =
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
