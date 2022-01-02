/* eslint-disable */
// @ts-nocheck

// eslint-disable-next-line no-undef
const DateTime = luxon.DateTime;
// eslint-disable-next-line no-undef
const Interval = luxon.Interval;

// eslint-disable-next-line no-redeclare
interface DateTime {
  set: any;
  setZone: any;
  fromISO: any;
  toUTC: any;
  toFormat: any;
  plus: any;
  minus: any;
}

// constants
const EVENT_TABLE_DELIMITER_SPACE = 8;
const FLOATING_DATETIME = 'floating'; // fixed datetime without timezone
const UTC_TIMEZONE = 'UTC';

interface CalendarEvent {
  id: any;
  startAt: string;
  endAt: string;
  timezoneStartAt: string;
  timezoneEndAt: string;
  summary: string;
  color: string;
  [key: string]: any;
}

const parseToDate = (item: string | DateTime): DateTime =>
  typeof item === 'string' ? DateTime.fromISO(item) : item;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const parseToDateTime = (
  // @ts-ignore
  date: DateTime | string,
  zone: string,
  deviceTimezone?: string
  // @ts-ignore
): DateTime => {
  const dateString: string = typeof date === 'string' ? date : date.toString();

  const isFloatingDatetime: boolean = zone === FLOATING_DATETIME;

  // Adjust date with timezone so when converted to UTC it represents correct value with fixed time
  if (isFloatingDatetime) {
    // @ts-ignore
    const dateFloating: DateTime = DateTime.fromISO(dateString, {
      zone: UTC_TIMEZONE,
    });

    return dateFloating.toUTC();
  }
  // @ts-ignore
  const thisDate: DateTime = DateTime.fromISO(dateString);

  if (!zone) {
    // Adjust datetime to device timezone
    if (deviceTimezone) {
      return thisDate.setZone(deviceTimezone);
    } else {
      return thisDate;
    }
  }

  return thisDate.setZone(zone);
};

const checkOverlappingDatesForHeaderEvents = (
  event: CalendarEvent,
  day: any,
  timezone: string
): boolean => {
  const dateStart = parseToDateTime(
    event.startAt,
    event.timezoneStartAt || timezone
  );
  const dateEnd = parseToDateTime(
    event.endAt,
    event.timezoneStartAt || timezone
  );
  const dayTruncated: number = parseToDate(day)
    .set({ hour: 0, minute: 0, millisecond: 0, second: 0 })
    .toMillis();

  const eventStartTruncated: number = dateStart
    .set({ hour: 0, minute: 0, millisecond: 0, second: 0 })
    .toMillis();
  const eventEndTruncated: number = dateEnd
    .set({ hour: 0, minute: 0, millisecond: 0, second: 0 })
    .toMillis();

  // fix wrong positioning when external all day event ends in next day
  if (event.externalID) {
    return (
      dayTruncated >= eventStartTruncated && dayTruncated < eventEndTruncated
    );
  } else {
    return (
      dayTruncated >= eventStartTruncated && dayTruncated <= eventEndTruncated
    );
  }
};

const formatDateTimeToString = (dateObj: DateTime): string =>
  dateObj.toFormat('dd-MM-yyyy');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stretchHeaderEventTimes = (
  event: CalendarEvent,
  timezone: string
): CalendarEvent => {
  return {
    ...event,
    startAt: parseToDateTime(event.startAt, event.timezoneStartAt || timezone)
      .set({ hour: 0, minute: 0, second: 1 })
      .toString(),
    endAt: parseToDateTime(event.endAt, event.timezoneStartAt || timezone)
      .set({ hour: 23, minute: 59, second: 59 })
      .toString(),
  };
};
const isEventInRange = (
  event: CalendarEvent,
  days: DateTime[],
  timezone: string
): boolean => {
  let hasMatch = false;

  for (const day of days) {
    if (checkOverlappingDatesForHeaderEvents(event, day, timezone)) {
      hasMatch = true;
      return true;
      // return false;
    }
  }

  return hasMatch;
};

const formatOverflowingEvents = (events: any[], timezone: string) => {
  const result: any = {};

  if (!events || events.length === 0) {
    return null;
  }

  events.forEach((event) => {
    const dateTimeStartAt = parseToDateTime(
      event.startAt,
      event.timezoneStartAt || timezone
    );
    const dateTimeEndAt = parseToDateTime(
      event.endAt,
      event.timezoneStartAt || timezone
    );

    // get each day for multi day events
    // @ts-ignore
    const differenceInDays: number = dateTimeEndAt.diff(dateTimeStartAt).days;

    for (let i = 0; i <= differenceInDays; i++) {
      const dateKey = formatDateTimeToString(dateTimeStartAt.plus({ days: i }));

      if (!result[dateKey]) {
        result[dateKey] = [event];
      } else {
        result[dateKey] = [...result[dateKey], ...[event]];
      }
    }
  });

  return result;
};

const getMonthRows = (calendarDays: any[]): any => {
  const calendarDaysRows: any[][] = [];

  let tempArray: any[] = [];

  calendarDays.forEach((item, i) => {
    const index = i + 1;
    if (index % 7 === 0) {
      tempArray.push(item);
      calendarDaysRows.push(tempArray);
      tempArray = [];
    } else {
      tempArray.push(item);
    }
  });

  return calendarDaysRows;
};

const sortByLength = (events: any[]) => {
  return events.sort((a, b) => {
    const diffA: number =
      DateTime.fromISO(a.endAt).toMillis() -
      DateTime.fromISO(a.startAt).toMillis();
    const diffB: number =
      DateTime.fromISO(b.endAt).toMillis() -
      DateTime.fromISO(b.startAt).toMillis();

    if (diffB > diffA) {
      return 1;
    } else if (diffB < diffA) {
      return -1;
    }

    return 0;
  });
};

const checkOverlappingEvents = (
  eventA: CalendarEvent,
  eventB: CalendarEvent,
  timezone: string
): boolean => {
  const startAtFirst: DateTime = parseToDateTime(
    eventA.startAt,
    eventA.timezoneStartAt,
    timezone
  );
  const endAtFirst: DateTime = parseToDateTime(
    eventA.endAt,
    eventA.timezoneStartAt,
    timezone
  );
  const startAtSecond: DateTime = parseToDateTime(
    eventB.startAt,
    eventB.timezoneStartAt,
    timezone
  );
  const endAtSecond: DateTime = parseToDateTime(
    eventB.endAt,
    eventB.timezoneStartAt,
    timezone
  );
  // @ts-ignore
  return Interval.fromDateTimes(startAtFirst, endAtFirst).overlaps(
    // @ts-ignore
    Interval.fromDateTimes(startAtSecond, endAtSecond)
  );
};

interface MonthRowResult {
  positions: any;
  overflowingEvents: CalendarEvent[];
}

const getMonthRowPosition = (
  events: any,
  width: number,
  calendarDays: DateTime[],
  timezone: string,
  maxEventsVisible: number
): MonthRowResult => {
  const overflowEvents: CalendarEvent[] = [];
  const tableSpace: number = (width / 100) * EVENT_TABLE_DELIMITER_SPACE;
  const result: any = [];
  const usedEvents: string[] = [];

  // filter only header events
  const eventsFiltered: CalendarEvent[] = [];

  if (!events) {
    return { positions: [], overflowingEvents: [] };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(events)?.map(([key, items]) => {
    // @ts-ignore
    items.forEach((item: CalendarEvent) => {
      // filter only relevant events
      const isInRange: boolean = isEventInRange(item, calendarDays, timezone);
      if (isInRange) {
        // correct position when external event ends in next day
        eventsFiltered.push(item);
      }
    });
  });

  // sort by length to fit more items in limited space
  const sortedByLength = sortByLength(eventsFiltered);

  // find all matching events to fit in one row
  sortedByLength?.forEach((event) => {
    const eventPositionResult: any[] = [];
    // check if event was used already
    // skip iteration if event was already resolved
    if (usedEvents.includes(event.id)) {
      return true;
    }

    // set event to row
    const rowWithNotOverlappingEvents: CalendarEvent[] = [event];
    usedEvents.push(event.id);

    // compare to rest of the events
    sortedByLength.forEach((eventToCompare) => {
      // check if event was used already
      // skip iteration if event was already resolved
      if (usedEvents.includes(eventToCompare.id)) {
        return true;
      }

      // don't compare to self // maybe remove?
      if (event.id === eventToCompare.id) {
        return true;
      }

      // check if events are not overlapping
      const isOverlapping: boolean = checkOverlappingEvents(
        stretchHeaderEventTimes(event, timezone),
        stretchHeaderEventTimes(eventToCompare, timezone),
        timezone
      );

      // found not overlapping matching event
      if (!isOverlapping) {
        let isMatchingAll = true;
        // compare match with other stored events for same row
        rowWithNotOverlappingEvents.forEach((itemFromRow) => {
          const isOverlappingAll: boolean = checkOverlappingEvents(
            stretchHeaderEventTimes(itemFromRow, timezone),
            stretchHeaderEventTimes(eventToCompare, timezone),
            timezone
          );

          // prevent merging if only one conflict exists
          if (isOverlappingAll) {
            isMatchingAll = false;
          }
        });

        if (isMatchingAll) {
          // store compared event in used array and add to row
          usedEvents.push(eventToCompare.id);
          rowWithNotOverlappingEvents.push(eventToCompare);
        }
      }
    });

    // place events accordingly in row next to each other
    rowWithNotOverlappingEvents.forEach((item) => {
      let offset = 0;
      let eventWidth = 0;
      let hasMatchingDay = false;

      calendarDays.forEach((day) => {
        if (checkOverlappingDatesForHeaderEvents(item, day, timezone)) {
          // set base offset only for first item
          eventWidth += width;
          hasMatchingDay = true;
        }

        // increment offset only till we have matching day
        if (!hasMatchingDay) {
          offset += width;
        }
      });

      const isOverflowing: boolean = result.length > maxEventsVisible;
      if (!isOverflowing) {
        // create event position data
        const eventPositionData: any = {
          event: item,
          width: Math.round(eventWidth - tableSpace),
          offsetLeft: offset,
          offsetTop: 0,
          height: 20,
          zIndex: 2,
        };

        eventPositionResult.push(eventPositionData);
      } else {
        overflowEvents.push(item);
      }
    });

    // save row to result
    result.push(eventPositionResult);
  });

  const formattedResult: any = {};

  result.forEach((events: any, index: number) => {
    events.forEach((item: any) => {
      formattedResult[item.event.id] = { ...item, offsetTop: index * 25 };
    });
  });

  return { positions: formattedResult, overflowingEvents: overflowEvents };
};

const calculateMonthPositions = (
  events: any,
  width: number,
  calendarDays: DateTime[],
  config: any,
  maxEventsVisible: number,
  setContext?: any
): any => {
  const result: any[] = [];
  let overflowingEvents: any = [];

  // TODO prefilter events for each row

  // split calendar days to rows
  const calendarDaysRows: DateTime[][] = getMonthRows(calendarDays);

  // get layout for each row
  calendarDaysRows.forEach((row) => {
    const rowResult: MonthRowResult = getMonthRowPosition(
      events,
      width / 7,
      row,
      config.timezone,
      maxEventsVisible
    );

    result.push(rowResult.positions);
    overflowingEvents = [...overflowingEvents, ...rowResult.overflowingEvents];
  });

  return { result, overflowingEvents };
};

addEventListener('message', (e) => {
  const data = JSON.parse(e.data);

  if (data.type === 'MONTH') {
    const { events, width, calendarDays, config, maxEventsVisible } = data;
    const dateTimeCalendarDays = calendarDays.map((item: any) =>
      DateTime.fromISO(item)
    );
    const monthPositions = calculateMonthPositions(
      events,
      width,
      dateTimeCalendarDays,
      config,
      maxEventsVisible
    );

    postMessage(
      JSON.stringify({
        type: 'monthPositions',
        ...monthPositions,
        calendarDays,
        overflowingEvents: formatOverflowingEvents(
          monthPositions.overflowingEvents,
          config.timezone
        ),
      })
    );
  }
});
