import { calculateCalendarDays, chooseSelectedDateIndex } from './calendarDays';
import {
  getArrayEnd,
  getArrayStart,
  getDayTimeEnd,
  getDayTimeStart,
} from './common';
import { DateTime } from 'luxon';
import { CALENDAR_VIEW } from '../common/enums';

/**
 * Calculate new calendar days and get events
 * @param isGoingForward
 * @param index
 */
export const getNewCalendarDays = async (
  calendarDays: DateTime[],
  calendarView: CALENDAR_VIEW,
  isGoingForward?: boolean,
  dispatchContext?: any
): Promise<void> => {
  if (isGoingForward === undefined) {
    // await getEventsInRange();

    return;
  }

  const setSelectedDate = (date: any) => {
    dispatchContext('selectedDate', date);
  };

  const newCalendarDays: DateTime[] = calculateCalendarDays(
    isGoingForward,
    calendarDays,
    calendarView,
    setSelectedDate
  );

  dispatchContext('calendarDays', newCalendarDays);
  dispatchContext(
    'selectedDate',
    newCalendarDays[chooseSelectedDateIndex(calendarView)]
  );

  // Set range for fetch new events
  const rangeFromFetch: string = getDayTimeStart(
    getArrayStart(newCalendarDays)
  );
  const rangeToFetch: string = getDayTimeEnd(getArrayEnd(newCalendarDays));

  // Store new edge value of range
  if (isGoingForward) {
    // reduxStore.dispatch(setRangeTo(rangeToFetch));
  } else {
    // reduxStore.dispatch(setRangeFrom(rangeFromFetch));
  }
};

export const navigateToToday = async (
  selectedView: CALENDAR_VIEW,
  setContext: any,
  dateNow: DateTime = DateTime.now()
): Promise<void> => {
  // temp fix for navigation to correct date
  // TODO refactor for one option for all views
  if (
    selectedView === CALENDAR_VIEW.DAY ||
    selectedView === CALENDAR_VIEW.THREE_DAYS
  ) {
    await getNewCalendarDays(
      [dateNow.minus({ days: 1 })],
      selectedView,
      true,
      setContext
    );
  } else if (selectedView === CALENDAR_VIEW.AGENDA) {
    await getNewCalendarDays([dateNow], selectedView, true, setContext);
  } else {
    await getNewCalendarDays([dateNow], selectedView, false, setContext);
  }
};
