import {
  CALENDAR_NAVIGATION_DIRECTION,
  CALENDAR_VIEW,
  WEEKDAY_START,
} from '../common/enums';
import { DateTime } from 'luxon';
import { calculateCalendarDays } from './calendarDays';

/**
 * Calculate new calendar days
 * @param calendarDays
 * @param calendarView
 * @param direction
 * @param weekDayStart
 * @param dispatchContext
 */
export const getNewCalendarDays = async (
  calendarDays: DateTime[],
  calendarView: CALENDAR_VIEW,
  direction: CALENDAR_NAVIGATION_DIRECTION,
  weekDayStart: WEEKDAY_START,
  dispatchContext?: any
): Promise<void> => {
  const setSelectedDate = (date: DateTime) => {
    dispatchContext('selectedDate', date);
  };

  const newCalendarDays: DateTime[] = calculateCalendarDays(
    direction,
    calendarDays,
    calendarView,
    setSelectedDate,
    weekDayStart
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
  weekDayStart: WEEKDAY_START,
  dateNow: DateTime = DateTime.now()
): Promise<void> => {
  await getNewCalendarDays(
    [dateNow],
    selectedView,
    CALENDAR_NAVIGATION_DIRECTION.TODAY,
    weekDayStart,
    setContext
  );
};
