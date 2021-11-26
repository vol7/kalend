import './MonthView.scss';

import React, { useContext } from 'react';
import MonthOneDay from './monthOneDay/MonthOneDay';
import { formatTimestampToDate } from '../../utils/common';
import { Context } from '../../context/store';
import { getNewCalendarDays } from '../../utils/getCalendarDays';
import Carousel from '../carousel/carousel';
import { CALENDAR_VIEW } from '../../common/enums';
import { CalendarEvent } from '../../common/interface';

const renderOneDay = (
  data: any,
  prefix: string,
  tableHeight: number,
  events: any,
  handleEventClick: (data: CalendarEvent) => void,
  showMoreMonth?: (data: CalendarEvent[]) => void
) =>
  data.map((day: any, index: number) => {
    const formattedDayString: string = formatTimestampToDate(day);

    return (
      <MonthOneDay
        key={`${prefix}-${formattedDayString}`}
        index={index}
        day={day}
        data={events ? events[formattedDayString] : []}
        handleEventClick={handleEventClick}
        showMoreMonth={showMoreMonth}
      />
    );
  });

interface MonthViewProps {
  handleEventClick: (data: CalendarEvent) => void;
  showMoreMonth?: (data: CalendarEvent[]) => void;
}
const MonthView = (props: MonthViewProps) => {
  const [store] = useContext(Context);
  const { height, width, calendarDays, events } = store;

  const { handleEventClick, showMoreMonth } = props;

  // Calculate height for days table

  const daysWrapper: any = {
    width,
    height,
  };

  const onPageChange = async (isGoingForward?: boolean) => {
    await getNewCalendarDays(calendarDays, CALENDAR_VIEW.MONTH, isGoingForward);
  };

  const days: any = renderOneDay(
    calendarDays,
    'month1',
    height,
    events,
    handleEventClick,
    showMoreMonth
  );

  return (
    // <Carousel onPageChange={onPageChange}>
    <div className={'MonthView__container'} style={daysWrapper}>
      {days}
    </div>
    // </Carousel>
  );
};

export default MonthView;
