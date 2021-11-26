import { DateTime } from 'luxon';
import { CALENDAR_VIEW } from '../common/enums';
import { CALENDAR_OFFSET_LEFT } from '../common/constants';
import { parseToDateTime } from './dateTimeParser';
import { CalendarEvent } from '../common/interface';

export const parseCssDark = (
  className: string,
  isDark: boolean | undefined
): string => (isDark ? `${className}-dark` : className);

export const formatTimestampToDate = (dateObj: any): string =>
  dateObj.isValid
    ? dateObj.toFormat('dd-MM-yyyy')
    : DateTime.fromISO(dateObj).toFormat('dd-MM-yyyy');

/**
 * Get left offset for timetable when hours column in used
 * @param calendarView
 */
export const getTableOffset = (calendarView: CALENDAR_VIEW): number => {
  if (
    calendarView === CALENDAR_VIEW.THREE_DAYS ||
    calendarView === CALENDAR_VIEW.DAY ||
    calendarView === CALENDAR_VIEW.WEEK
  ) {
    return CALENDAR_OFFSET_LEFT;
  }

  return 0;
};

export const getArrayStart = (array: any) => array[0];
export const getArrayEnd = (array: any) => array[array.length - 1];
export const getDayTimeStart = (date: DateTime): string =>
  date.set({ hour: 0, minute: 0, second: 0 }).toUTC().toString();
export const getDayTimeEnd = (date: DateTime): string =>
  date.set({ hour: 23, minute: 59, second: 59 }).toUTC().toString();

export const isAllDayEvent = (item: CalendarEvent): boolean => {
  if (!item) {
    return false;
  }

  return (
    // @ts-ignore
    parseToDateTime(item.endAt, item.timezoneStart)
      .diff(parseToDateTime(item.startAt, item.timezoneStart), 'days')
      .toObject().days > 1
  );
};
