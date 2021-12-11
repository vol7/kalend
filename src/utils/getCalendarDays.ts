import { CALENDAR_NAVIGATION_DIRECTION, CALENDAR_VIEW } from '../common/enums';
import { CalendarDay } from '../common/interface';
import { DateTime } from 'luxon';
import { calculateCalendarDays, chooseSelectedDateIndex } from './calendarDays';

/**
 * Calculate new calendar days
 * @param calendarDays
 * @param calendarView
 * @param direction
 * @param dispatchContext
 */
export const getNewCalendarDays = async (
  calendarDays: CalendarDay[],
  calendarView: CALENDAR_VIEW,
  direction: CALENDAR_NAVIGATION_DIRECTION,
  dispatchContext?: any
): Promise<void> => {
  const setSelectedDate = (date: DateTime) => {
    dispatchContext('selectedDate', date);
  };

  const newCalendarDays: CalendarDay[] = calculateCalendarDays(
    direction,
    calendarDays,
    calendarView,
    setSelectedDate
  );

  dispatchContext('calendarDays', newCalendarDays);
  // dispatchContext(
  //   'selectedDate',
  //   newCalendarDays[chooseSelectedDateIndex(calendarView)]
  // );
};

export const navigateToToday = async (
  selectedView: CALENDAR_VIEW,
  setContext: any,
  dateNow: DateTime = DateTime.now()
): Promise<void> => {
  await getNewCalendarDays(
    [{ id: `${dateNow.toString()}_1`, date: dateNow }],
    selectedView,
    CALENDAR_NAVIGATION_DIRECTION.TODAY,
    setContext
  );
};
