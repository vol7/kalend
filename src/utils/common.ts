import { CALENDAR_OFFSET_LEFT } from '../common/constants';
import { CALENDAR_VIEW } from '../common/enums';
import { CalendarEvent } from '../common/interface';
import { DateTime } from 'luxon';
import { parseToDateTime } from './dateTimeParser';

export const parseCssDark = (
  className: string,
  isDark: boolean | undefined
): string => (isDark ? `${className}-dark` : className);

export const parseIsMobile = (className: string, isMobile: boolean): string => {
  return isMobile ? `${className}-mobile` : className;
};

export const parseClassName = (
  className: string,
  isMobile?: boolean,
  isDark?: boolean
): string => {
  let classNameParsed = className;
  classNameParsed = isMobile ? `${classNameParsed}-mobile` : classNameParsed;
  classNameParsed = isDark ? `${classNameParsed}-dark` : classNameParsed;

  return classNameParsed;
};

export const formatTimestampToDate = (dateObj: any): string =>
  dateObj.isValid
    ? dateObj.toFormat('dd-MM-yyyy')
    : DateTime.fromISO(dateObj).toFormat('dd-MM-yyyy');

export const formatDateTimeToString = (dateObj: DateTime): string =>
  dateObj.toFormat('dd-MM-yyyy');

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
    parseToDateTime(item.endAt, item.timezoneStartAt)
      .diff(parseToDateTime(item.startAt, item.timezoneStartAt), 'days')
      .toObject().days > 1
  );
};

export const parseCalendarViewToText = (
  calendarView: CALENDAR_VIEW
): string => {
  switch (calendarView) {
    case CALENDAR_VIEW.AGENDA:
      return 'Agenda';
    case CALENDAR_VIEW.DAY:
      return 'Day';
    case CALENDAR_VIEW.THREE_DAYS:
      return '3 days';
    case CALENDAR_VIEW.WEEK:
      return 'Week';
    case CALENDAR_VIEW.MONTH:
      return 'Month';
    default:
      return '';
  }
};

export const eventsToArray = (events: any): CalendarEvent[] => {
  let result: CalendarEvent[] = [];

  if (!events) {
    return result;
  }

  Object.entries(events).forEach((keyValue: any) => {
    const eventsItems: CalendarEvent[] = keyValue[1];
    result = [...result, ...eventsItems];
  });

  return result;
};

export const eventsToDateKey = (events: CalendarEvent[], timezone: string) => {
  const result: any = {};

  events?.forEach((item: any) => {
    const dateKey: any = parseToDateTime(
      item.startAt,
      item.timezoneStartAt || timezone
    ).toFormat('dd-MM-yyyy');

    if (result[dateKey]) {
      result[dateKey] = [...result[dateKey], ...[item]];
    } else {
      result[dateKey] = [item];
    }
  });

  return result;
};
