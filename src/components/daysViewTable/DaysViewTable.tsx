import './DaysViewTable.scss';

import React, { useContext } from 'react';
import { DateTime } from 'luxon';

import { CALENDAR_OFFSET_LEFT } from '../../common/constants';
import {
  CalendarEvent,
  Config,
  NewEventClickData,
} from '../../common/interface';
import DaysViewOneDay from './daysViewOneDay/DaysViewOneDay';
import { formatTimestampToDate } from '../../utils/common';
import CalendarBodyHours from './daysViewOneDay/calendarBodyHours/CalendarBodyHours';
import { Context } from '../../context/store';
import { getNewCalendarDays } from '../../utils/getCalendarDays';
import { CALENDAR_VIEW } from '../../common/enums';
import Carousel from '../carousel/carousel';

const renderOneDay = (
  calendarDays: DateTime[],
  handleNewEventClick: (data: NewEventClickData) => void,
  events: any,
  handleEventClick: (data: CalendarEvent) => void
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
      />
    );
  });

interface CalendarBodyProps {
  handleNewEventClick: (data: NewEventClickData) => void;
  handleEventClick: (data: CalendarEvent) => void;
}
const DaysViewTable = (props: CalendarBodyProps) => {
  const { handleNewEventClick, handleEventClick } = props;

  const [store] = useContext(Context);
  const { calendarDays, width, height, events, selectedView } = store;

  const headerEventRowsCount = 0;

  const days: any = renderOneDay(
    calendarDays,
    handleNewEventClick,
    events,
    handleEventClick
  );

  const style: any = {
    paddingLeft: CALENDAR_OFFSET_LEFT,
    width,
    height: height, //- headerEventRowsCount * 22,
  };

  /**
   * Adjust scroll position for all screens
   * @param currentIndex
   */
  const setCurrentOffset = (): void => {
    const currentElement: any = document.getElementById(`timetable`);

    // Have to set middle clone for last screen manually to get correct current offset
    const currentOffset: number = currentElement.scrollTop;

    // Need to select with query selector as byId doesn't select clones
    const elements: any = document.querySelectorAll('.calendar-body__wrapper');

    for (const element of elements) {
      element.scrollTop = currentOffset;
    }
  };

  // Debounce scroll function
  // Turn off for desktop layout as there is just one active screen
  // const handleScroll = _.debounce(() => {
  //   if (!isMobile) {
  //     return;
  //   }
  //   setCurrentOffset();
  // }, 50);

  const onPageChange = async (isGoingForward?: boolean) => {
    await getNewCalendarDays(calendarDays, selectedView, isGoingForward);
  };

  return (
    // <Carousel onPageChange={onPageChange}>
    <div
      style={style}
      className={'CalendarBody'}
      id={`timetable`}
      // onScroll={handleScroll}
    >
      <CalendarBodyHours />
      {days}
    </div>
    // </Carousel>
  );
};

export default DaysViewTable;
