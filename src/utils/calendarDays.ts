/* tslint:disable:no-magic-numbers */
import { DateTime } from 'luxon';
import { getArrayEnd, getArrayStart } from './common';
import LuxonHelper from './luxonHelper';
import { CALENDAR_VIEW } from '../common/enums';

const ONE_DAY = 1;
const THREE_DAYS = 3;
const SEVEN_DAYS = 7;
export const CALENDAR_OFFSET_LEFT = 24;
export const ONE_HOUR_HEIGHT = 39;
export const HEADER_HEIGHT_SMALL = 56;
export const HEADER_HEIGHT_BASE = 138;
export const HEADER_HEIGHT_BASE_DESKTOP = 208;
export const HEADER_HEIGHT_EXTENDER = 166;
export const NAVBAR_HEIGHT_BASE = 50;
export const CALENDAR_DRAWER_DESKTOP_WIDTH = 247;

export const formatIsoStringDate = (stringDate: string) =>
  stringDate.slice(0, stringDate.indexOf('T'));

export const hoursArray = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
];

export const hoursArrayString = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];

export const parseEventColor = (
  colorString: string,
  isDark?: boolean
): string =>
  calendarColors[colorString]
    ? calendarColors[colorString][isDark ? 'dark' : 'light']
    : colorString;

export const calendarColors: any = {
  red: { dark: '#ef9a9a', light: '#e53935' },
  pink: { dark: '#f48fb1', light: '#d81b60' },
  purple: { dark: '#ce93d8', light: '#8e24aa' },
  'deep purple': { dark: '#b39ddb', light: '#5e35b1' },
  indigo: { dark: '#9fa8da', light: '#3949ab' },
  blue: { dark: '#90caf9', light: '#1e88e5' },
  'light blue': { dark: '#81d4fa', light: '#039be5' },
  cyan: { dark: '#80deea', light: '#00acc1' },
  teal: { dark: '#80cbc4', light: '#00897b' },
  green: { dark: '#a5d6a7', light: '#43a047' },
  'light green': { dark: '#c5e1a5', light: '#7cb342' },
  yellow: { dark: '#fff59d', light: '#fdd835' },
  amber: { dark: '#ffe082', light: '#ffb300' },
  orange: { dark: '#ffcc80', light: '#fb8c00' },
  'deep orange': { dark: '#ffab91', light: '#f4511e' },
  brown: { dark: '#bcaaa4', light: '#6d4c41' },
  'blue grey': { dark: '#b0bec5', light: '#546e7a' },
};

export const daysText = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export const calculateOneDay = (
  date: DateTime,
  isGoingForward?: boolean | null
): DateTime => {
  let refDate: DateTime;

  if (isGoingForward === null || isGoingForward === undefined) {
    refDate = date;
  } else if (isGoingForward) {
    refDate = date.plus({ days: 1 });
  } else {
    refDate = date.minus({ days: 1 });
  }

  return refDate;
};

const getOneDay = (
  date: DateTime,
  setSelectedDate: any,
  isGoingForward?: boolean | null
): DateTime[] => {
  const refDate: DateTime = calculateOneDay(date, isGoingForward);

  // Set state
  if (setSelectedDate) {
    setSelectedDate(refDate);
  }

  return [refDate];
};

export const calculateAgendaDays = (
  date: DateTime,
  isGoingForward?: boolean | null,
  disableDispatch?: boolean
): DateTime[] => {
  const refDate =
    isGoingForward || isGoingForward === undefined || isGoingForward === null
      ? date
      : date.minus({ months: 1 });
  const firstDayInMonth: DateTime = LuxonHelper.getFirstDayOfMonth(refDate);
  const daysInMonth: number = refDate.daysInMonth;
  const monthDays: DateTime[] = [];

  // Add missing days to month view
  for (let i = 0; i <= daysInMonth; i += 1) {
    const day: DateTime = firstDayInMonth.plus({ days: i });
    monthDays.push(day);
  }

  return monthDays;
};

export const calculateMonthDays = (
  date: DateTime,
  isGoingForward?: boolean | null,
  disableDispatch?: boolean
): DateTime[] => {
  const FIVE_WEEKS_DAYS_COUNT = 36;
  // Get reference date for calculating new month

  // Get first week of current month
  const firstDayOfCurrentMonth: DateTime = LuxonHelper.getFirstDayOfMonth(date);

  const firstWeekOfCurrentMonth: DateTime[] = getWeekDays(
    firstDayOfCurrentMonth,
    CALENDAR_VIEW.WEEK,
    undefined,
    disableDispatch
  );

  const monthDays: DateTime[] = firstWeekOfCurrentMonth;

  // Add missing days to month view
  for (let i = 1; i < FIVE_WEEKS_DAYS_COUNT; i += 1) {
    const day: DateTime = firstWeekOfCurrentMonth[6].plus({ days: i });
    monthDays.push(day);
  }

  return monthDays;
};

export const getAgendaDays = (
  date: DateTime,
  setSelectedDate: any,
  isGoingForward?: boolean | null,
  isCurrent?: boolean,
  disableDispatch?: boolean
) => {
  const monthDays: DateTime[] = calculateAgendaDays(
    date,
    isGoingForward,
    disableDispatch
  );

  if (disableDispatch) {
    return monthDays;
  }

  // Set state
  if (isCurrent && setSelectedDate) {
    setSelectedDate(monthDays[15]);
  }

  return monthDays;
};

export const getMonthDays = (
  date: DateTime,
  setSelectedDate: any,
  isGoingForward?: boolean | null,
  isCurrent?: boolean,
  disableDispatch?: boolean
) => {
  const monthDays: DateTime[] = calculateMonthDays(
    date,
    isGoingForward,
    disableDispatch
  );

  if (disableDispatch) {
    return monthDays;
  }

  // Set state
  if (isCurrent && setSelectedDate) {
    setSelectedDate(monthDays[15]);
  }

  return monthDays;
};

export const getWeekDays = (
  date: DateTime,
  calendarView: CALENDAR_VIEW,
  setSelectedDate?: any,
  isGoingForward?: boolean | null,
  disableDispatch?: boolean
): DateTime[] => {
  // Get reference date for calculating new week
  const dateForNewWeek: any =
    isGoingForward !== null && isGoingForward !== undefined
      ? isGoingForward
        ? date.plus({ days: 1 })
        : date.minus({ days: 1 })
      : date;

  // Set state
  if (
    !disableDispatch &&
    setSelectedDate &&
    calendarView !== CALENDAR_VIEW.MONTH
  ) {
    setSelectedDate(dateForNewWeek);
  }

  const days = [];
  const dayInWeek = dateForNewWeek.weekday;
  const startDate = dateForNewWeek.minus({ days: dayInWeek - 1 });

  if (calendarView === CALENDAR_VIEW.MONTH) {
    if (dayInWeek === 0) {
      for (let i = 6; i > 0; i--) {
        days.push(dateForNewWeek.minus({ days: i }));
      }
      days.push(dateForNewWeek);
    } else {
      days.push(startDate);
      for (let i = 1; i < 7; i++) {
        days.push(startDate.plus({ days: i }));
      }
    }
  } else {
    for (let i = 0; i < 7; i++) {
      days.push(startDate.plus({ days: i }));
    }
  }

  return days;
};

export const getThreeDays = (
  date: DateTime,
  setSelectedDate: any,
  isGoingForward?: boolean | null
): DateTime[] => {
  const days = [];

  if (isGoingForward === null || isGoingForward === undefined) {
    for (let i = 0; i <= 2; i++) {
      days.push(date.plus({ days: i }));
    }
  } else if (isGoingForward) {
    for (let i = 1; i <= 3; i++) {
      days.push(date.plus({ days: i }));
    }
  } else {
    for (let i = 3; i > 0; i--) {
      days.push(date.minus({ days: i }));
    }
  }

  // Set state
  if (setSelectedDate) {
    setSelectedDate(days[1]);
  }

  return days;
};

export const getCalendarDays = (
  calendarView: CALENDAR_VIEW,
  date: DateTime,
  isGoingForward?: boolean | null,
  setSelectedDate?: any,
  isCurrent?: boolean
): DateTime[] => {
  switch (calendarView) {
    case CALENDAR_VIEW.WEEK:
      return getWeekDays(date, calendarView, setSelectedDate, isGoingForward);
    case CALENDAR_VIEW.THREE_DAYS:
      return getThreeDays(date, setSelectedDate, isGoingForward);
    case CALENDAR_VIEW.DAY:
      return getOneDay(date, setSelectedDate, isGoingForward);
    case CALENDAR_VIEW.MONTH:
      return getMonthDays(date, setSelectedDate, isGoingForward, isCurrent);
    case CALENDAR_VIEW.AGENDA:
      return getAgendaDays(date, setSelectedDate, isGoingForward, isCurrent);
    default:
      return getWeekDays(date, calendarView, setSelectedDate, isGoingForward);
  }
};

export const getDaysNum = (calendarView: CALENDAR_VIEW): number => {
  switch (calendarView) {
    case CALENDAR_VIEW.WEEK:
      return SEVEN_DAYS;
    case CALENDAR_VIEW.THREE_DAYS:
      return THREE_DAYS;
    case CALENDAR_VIEW.DAY:
      return ONE_DAY;
    default:
      return SEVEN_DAYS;
  }
};

export const mapCalendarColors = (calendars: any) => {
  const result: any = {};
  for (const calendar of calendars) {
    result[calendar.id] = {
      color: {
        light: calendar.color.light,
        dark: calendar.color.dark,
      },
    };
  }

  return result;
};

export const parseToDate = (item: string | DateTime): DateTime =>
  typeof item === 'string' ? DateTime.fromISO(item) : item;

export const parseDateToString = (item: string | DateTime): string =>
  typeof item === 'string' ? item : item.toString();

export const checkIfSwipingForward = (
  oldIndex: number,
  newIndex: number
): boolean =>
  (oldIndex === 0 && newIndex === 1) ||
  (oldIndex === 1 && newIndex === 2) ||
  (oldIndex === 2 && newIndex === 0);

export const chooseSelectedDateIndex = (
  calendarView: CALENDAR_VIEW
): number => {
  switch (calendarView) {
    case CALENDAR_VIEW.MONTH:
      return 15;
    case CALENDAR_VIEW.AGENDA:
      return 15;
    case CALENDAR_VIEW.WEEK:
      return 2;
    case CALENDAR_VIEW.THREE_DAYS:
      return 0;
    case CALENDAR_VIEW.DAY:
      return 0;
    default:
      return 2;
  }
};

export const calculateCalendarDays = (
  isGoingForward: boolean,
  calendarDays: DateTime[],
  calendarView: CALENDAR_VIEW,
  setSelectedDate: any
): DateTime[] => {
  if (isGoingForward) {
    return getCalendarDays(
      calendarView,
      getArrayEnd(calendarDays),
      isGoingForward,
      setSelectedDate
    );
  } else {
    return getCalendarDays(
      calendarView,
      getArrayStart(calendarDays),
      isGoingForward,
      setSelectedDate
    );
  }
};
