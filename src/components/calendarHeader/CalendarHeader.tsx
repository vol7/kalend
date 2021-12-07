import { useContext } from 'react';
import CalendarHeaderDays from './calendarHeaderDays/CalendarHeaderDays';
import CalendarHeaderEvents from './calendarHeaderEvents/CalendarHeaderEvents';
import { Context } from '../../context/store';
import { CALENDAR_VIEW } from '../../common/enums';
import { CalendarHeaderProps } from './CalendarHeader.props';

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { handleEventClick } = props;

  const [store] = useContext(Context);
  const { isDark, width, selectedView } = store;

  const isDayView: boolean = selectedView === CALENDAR_VIEW.DAY;
  const isMonthView: boolean = selectedView === CALENDAR_VIEW.MONTH;

  return (
    <div
      className={`Calend__CalendarHeader${!isMonthView ? '-tall' : ''}${
        isDayView ? '-day' : ''
      }${isMonthView ? '-small' : ''}${isDark ? '-dark' : ''}`}
    >
      <CalendarHeaderDays width={width} isMonthView={isMonthView} />
      {!isMonthView ? (
        <CalendarHeaderEvents handleEventClick={handleEventClick} />
      ) : null}
    </div>
  );
};

export default CalendarHeader;
