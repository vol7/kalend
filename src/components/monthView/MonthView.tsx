import {
  CalendarDay,
  OnEventClickFunc,
  ShowMoreMonthFunc,
} from '../../common/interface';
import { Context } from '../../context/store';
import { MonthViewProps } from './MonthView.props';
import { formatTimestampToDate } from '../../utils/common';
import { useContext } from 'react';
import MonthOneDay from './monthOneDay/MonthOneDay';

const renderOneDay = (
  data: CalendarDay[],
  prefix: string,
  tableHeight: number,
  events: any,
  handleEventClick: OnEventClickFunc,
  showMoreMonth?: ShowMoreMonthFunc
) =>
  data.map((calendarDay: CalendarDay, index: number) => {
    const formattedDayString: string = formatTimestampToDate(calendarDay.date);

    return (
      <MonthOneDay
        key={`${prefix}-${formattedDayString}`}
        index={index}
        day={calendarDay.date}
        data={events ? events[formattedDayString] : []}
        handleEventClick={handleEventClick}
        showMoreMonth={showMoreMonth}
      />
    );
  });

const MonthView = (props: MonthViewProps) => {
  const [store] = useContext(Context);
  const { height, width, calendarDays } = store;

  const { handleEventClick, showMoreMonth, events } = props;

  // Calculate height for days table

  const daysWrapper: any = {
    width,
    height,
  };

  // const onPageChange = async (isGoingForward?: boolean) => {
  //   await getNewCalendarDays(calendarDays, CALENDAR_VIEW.MONTH, isGoingForward);
  // };

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
    <div className={'Calend__MonthView__container'} style={daysWrapper}>
      {days}
    </div>
    // </Carousel>
  );
};

export default MonthView;
