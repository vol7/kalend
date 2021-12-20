import { CALENDAR_VIEW } from '../../common/enums';
import { CalendarHeaderProps } from './CalendarHeader.props';
import { Config, NormalEventPosition } from '../../common/interface';
import { Context } from '../../context/store';
import { calculatePositionForHeaderEvents } from './calendarHeaderEvents/CalendarHeaderEvents.utils';
import { useContext, useEffect } from 'react';
import CalendarHeaderDays from './calendarHeaderDays/CalendarHeaderDays';
import CalendarHeaderEvents from './calendarHeaderEvents/CalendarHeaderEvents';

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { events } = props;

  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { isDark, width, selectedView, calendarDays, config } = store;
  const { timezone } = config as Config;

  const isDayView: boolean = selectedView === CALENDAR_VIEW.DAY;
  const isMonthView: boolean = selectedView === CALENDAR_VIEW.MONTH;

  useEffect(() => {
    const eventPositions: NormalEventPosition[][] =
      calculatePositionForHeaderEvents(
        events,
        width / calendarDays.length,
        calendarDays,
        timezone,
        setContext
      );

    setContext('headerLayout', eventPositions);
  }, []);
  useEffect(() => {
    const eventPositions: NormalEventPosition[][] =
      calculatePositionForHeaderEvents(
        events,
        width / calendarDays.length,
        calendarDays,
        timezone,
        setContext
      );

    setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

    setContext('headerLayout', eventPositions);
  }, [calendarDays[0]]);

  return (
    <div
      className={`Kalend__CalendarHeader${!isMonthView ? '-tall' : ''}${
        isDayView ? '-day' : ''
      }${isMonthView ? '-small' : ''}${isDark ? '-dark' : ''}`}
    >
      <CalendarHeaderDays width={width} isMonthView={isMonthView} />
      {!isMonthView && store.headerLayout ? <CalendarHeaderEvents /> : null}
    </div>
  );
};

export default CalendarHeader;
