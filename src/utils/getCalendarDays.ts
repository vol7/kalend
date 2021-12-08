import { calculateCalendarDays, chooseSelectedDateIndex } from './calendarDays';
import { DateTime } from 'luxon';
import { CALENDAR_NAVIGATION_DIRECTION, CALENDAR_VIEW } from '../common/enums';

/**
 * Calculate new calendar days
 * @param calendarDays
 * @param calendarView
 * @param direction
 * @param dispatchContext
 */
export const getNewCalendarDays = async (
  calendarDays: DateTime[],
  calendarView: CALENDAR_VIEW,
  direction: CALENDAR_NAVIGATION_DIRECTION,
  dispatchContext?: any
): Promise<void> => {
  const setSelectedDate = (date: any) => {
    dispatchContext('selectedDate', date);
  };

  const newCalendarDays: DateTime[] = calculateCalendarDays(
    direction,
    calendarDays,
    calendarView,
    setSelectedDate
  );

  dispatchContext('calendarDays', newCalendarDays);
  dispatchContext(
    'selectedDate',
    newCalendarDays[chooseSelectedDateIndex(calendarView)]
  );
};

export const navigateToToday = async (
  selectedView: CALENDAR_VIEW,
  setContext: any,
  dateNow: DateTime = DateTime.now()
): Promise<void> => {
  await getNewCalendarDays(
    [dateNow],
    selectedView,
    CALENDAR_NAVIGATION_DIRECTION.TODAY,
    setContext
  );
};
