/* eslint-disable */
// @ts-nocheck

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
const CALENDAR_OFFSET_LEFT = 40;
const EVENT_MIN_HEIGHT = 25;
const SCROLLBAR_WIDTH = 15;
const SHOW_TIME_THRESHOLD = 60;
const ONE_DAY = 1;
const THREE_DAYS = 3;
const SEVEN_DAYS = 7;

enum CALENDAR_VIEW {
  AGENDA = 'agenda',
  WEEK = 'week',
  DAY = 'day',
  THREE_DAYS = 'threeDays',
  MONTH = 'month',
}

const adjustForMinimalHeight = (
  eventA: any,
  eventB: any,
  hourHeight: number
): { eventA: any; eventB: any } => {
  const result: any = {
    eventA: { ...eventA },
    eventB: { ...eventB },
  };

  const eventADiff: number =
    // @ts-ignore
    DateTime.fromISO(eventA.endAt)
      .diff(DateTime.fromISO(eventA.startAt))
      .toObject().minutes /
    (60 / hourHeight);
  const eventBDiff: number =
    // @ts-ignore
    DateTime.fromISO(eventB.endAt)
      .diff(DateTime.fromISO(eventB.startAt))
      .toObject().minutes /
    (60 / hourHeight);

  if (eventADiff < EVENT_MIN_HEIGHT) {
    result.eventA.endAt = DateTime.fromISO(result.eventA.endAt)
      .plus({
        minutes: EVENT_MIN_HEIGHT - eventADiff,
      })
      .toString();
  }
  if (eventBDiff < EVENT_MIN_HEIGHT) {
    result.eventB.endAt = DateTime.fromISO(result.eventB.endAt)
      .plus({
        minutes: EVENT_MIN_HEIGHT - eventBDiff,
      })
      .toString();
  }

  return result;
};

const getDaysNum = (calendarView: CALENDAR_VIEW): number => {
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

const getCorrectWidth = (
  width: number,
  isMobile: boolean,
  selectedView: CALENDAR_VIEW
): number => {
  if (
    selectedView === CALENDAR_VIEW.WEEK ||
    selectedView === CALENDAR_VIEW.DAY ||
    selectedView === CALENDAR_VIEW.THREE_DAYS
  ) {
    if (isMobile) {
      return width;
    } else {
      return width - SCROLLBAR_WIDTH;
    }
  }

  return width;
};

const isAllDayEvent = (item: CalendarEvent): boolean => {
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

// DAYS WORKER NORMAL
const calculateNormalEventPositions = (
  events: any,
  baseWidth: number,
  config: any,
  selectedView: any,
  dateKey: string
): any[] => {
  const result: any[] = [];

  let offsetCount: any = []; //Store every event id of overlapping items
  let offsetCountFinal: any; //Sort events by id number
  const tableWidth: number = baseWidth / getDaysNum(selectedView);
  const tableSpace: number = (tableWidth / 100) * EVENT_TABLE_DELIMITER_SPACE;

  if (events) {
    const eventsData: any = events;
    // Filter all day events and multi day events
    eventsData
      .filter((item: any) => !item.allDay)
      .map((event: any) => {
        let width = 1; //Full width
        let offsetLeft = 0;
        // Compare events
        eventsData.forEach((item2: any) => {
          if (event.id !== item2.id && !item2.allDay) {
            // adjust events to have at least minimal height to check
            // overlapping
            const { eventA, eventB } = adjustForMinimalHeight(
              event,
              item2,
              config.hourHeight
            );

            if (
              checkOverlappingEvents(eventA, eventB, config.timezone) &&
              !eventB.allDay
            ) {
              width = width + 1; //add width for every overlapping item
              offsetCount.push(item2.id); // set offset for positioning
              offsetCount.push(event.id); // set offset for positioning
            }
          }
        });

        const offsetTop: any =
          // @ts-ignore
          parseToDateTime(event.startAt, event.timezoneStartAt, config.timezone)
            .diff(
              parseToDateTime(
                event.startAt,
                event.timezoneStartAt,
                config.timezone
              ).set({
                hour: 0,
                minute: 0,
                second: 0,
              }),
              'minutes'
            )
            .toObject().minutes /
          (60 / config.hourHeight); // adjust based on hour column height

        const eventHeight: any =
          // @ts-ignore
          parseToDateTime(event.endAt, event.timezoneStartAt)
            .diff(
              parseToDateTime(event.startAt, event.timezoneStartAt),
              'minutes'
            )
            .toObject().minutes /
          (60 / config.hourHeight); // adjust based on hour column height

        const eventWidth: number = tableWidth / width;

        //sort items for proper calculations of offset by id
        // prevent different order in loop
        if (offsetCount.length > 0) {
          offsetCountFinal = offsetCount.sort();
        }

        if (offsetCountFinal) {
          offsetLeft = eventWidth * offsetCountFinal.indexOf(event.id); //count offset
        }

        //event.left
        // Current status: events is displayed in wrong place
        offsetCount = [];
        offsetCountFinal = '';

        result.push({
          dateKey,
          event,
          height:
            eventHeight < EVENT_MIN_HEIGHT ? EVENT_MIN_HEIGHT : eventHeight,
          width: eventWidth,
          offsetLeft,
          offsetTop,
          zIndex: 2,
          meta: {
            isFullWidth: width === 1,
            showTime:
              eventWidth >= SHOW_TIME_THRESHOLD &&
              eventHeight >= SHOW_TIME_THRESHOLD,
            centerText: eventHeight <= SHOW_TIME_THRESHOLD,
          },
        });
      });
  }

  const partialResult: any[] = result.map((item: any) => {
    // full event width
    if (item.meta?.isFullWidth) {
      return {
        ...item,
        width: Math.round(item.width - tableSpace), // add some padding,
      };
    } else if (item.offsetLeft > 0) {
      return {
        ...item,
        width: Math.round(item.width),
        offsetLeft: item.offsetLeft - tableSpace,
        zIndex: item.zIndex ? item.zIndex + 2 : 2,
      };
    } else {
      return { ...item, width: Math.round(item.width) };
    }
  });

  return partialResult;
};

const calculateDaysViewLayout = (
  calendarDays: DateTime[],
  events: any,
  baseWidth: number,
  config: any,
  selectedView: any
) => {
  const result: any = {};
  calendarDays.forEach((calendarDay) => {
    const formattedDayString: string = calendarDay.toFormat('dd-MM-yyyy');
    const dayEvents: any = events[formattedDayString];

    const groupedPositions: any = {};

    const positions = calculateNormalEventPositions(
      dayEvents,
      baseWidth,
      config,
      selectedView,
      formattedDayString
    );

    positions.forEach((item: any) => {
      if (groupedPositions[item.event.id]) {
        groupedPositions[item.event.id] = item;
      } else {
        groupedPositions[item.event.id] = item;
      }
    });

    result[formattedDayString] = groupedPositions;
  });

  return result;
};

// DAYS WORKER HEADER
const calculatePositionForHeaderEvents = (
  events: any,
  width: number,
  calendarDays: DateTime[],
  timezone: string,
  setContext?: any
): any => {
  // TODO prefilter only relevant events
  // TODO remove used events from main array
  // const formattedDayString: string = formatTimestampToDate(day);
  //
  // const dataForDay: any = events ? events[formattedDayString] : [];
  //
  // const headerEvents: any = renderEvents(calendarBodyWidth, dataForDay);
  //
  // compare each event and find those which can be placed next to each
  // other and are not overlapping
  // form them to row

  const tableSpace: number =
    ((width + CALENDAR_OFFSET_LEFT) / 100) * EVENT_TABLE_DELIMITER_SPACE;
  const result: any = [];
  const usedEvents: string[] = [];

  // filter only header events
  const headerEventsFiltered: CalendarEvent[] = [];

  if (!events) {
    return [[]];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(events)?.map(([key, items]) => {
    // @ts-ignore
    items.forEach((item: CalendarEvent) => {
      // filter only relevant events
      if (item.allDay || isAllDayEvent(item)) {
        const isInRange: boolean = isEventInRange(item, calendarDays, timezone);
        if (isInRange) {
          // correct position when external event ends in next day
          headerEventsFiltered.push(item);
        }
      }
    });
  });

  // find all matching events to fit in one row
  headerEventsFiltered?.forEach((event) => {
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
    headerEventsFiltered.forEach((eventToCompare) => {
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

    // now we have row with only not overlapping events
    // sort events in row by start date
    const sortedResult: CalendarEvent[] = rowWithNotOverlappingEvents.sort(
      (a, b) =>
        DateTime.fromISO(a.startAt).toMillis() -
        DateTime.fromISO(b.startAt).toMillis()
    );

    // place events accordingly in row next to each other
    sortedResult.forEach((item) => {
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

      // create event position data
      const eventPositionData: any = {
        event: item,
        width: Math.round(eventWidth - tableSpace),
        offsetLeft: offset + CALENDAR_OFFSET_LEFT,
        offsetTop: 0,
        height: 20,
        zIndex: 2,
      };

      eventPositionResult.push(eventPositionData);
    });

    // save row to result
    result.push(eventPositionResult);
  });

  const formattedResult: any = {};

  result.forEach((events: any, index: number) => {
    events.forEach((item: any) => {
      formattedResult[item.event.id] = { ...item, offsetTop: index * 26 };
    });
  });

  return { formattedResult, headerEventRowsCount: result.length };
};

addEventListener('message', (e) => {
  const data = JSON.parse(e.data);

  if (data) {
    const {
      events,
      width,
      calendarDays,
      config,
      maxEventsVisible,
      isMobile,
      selectedView,
    } = data;

    const dateTimeCalendarDays = calendarDays.map((item: any) =>
      DateTime.fromISO(item)
    );

    if (data.type === 'MONTH') {
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
    } else if (data.type === 'DAYS') {
      const headerPositions: any = calculatePositionForHeaderEvents(
        events,
        getCorrectWidth(width, isMobile, CALENDAR_VIEW.WEEK) /
          calendarDays.length,
        dateTimeCalendarDays,
        config.timezone
      );
      const normalPositions: any = calculateDaysViewLayout(
        dateTimeCalendarDays,
        events,
        getCorrectWidth(width, isMobile, CALENDAR_VIEW.WEEK),
        config,
        selectedView
      );

      postMessage(
        JSON.stringify({
          type: 'daysPositions',
          headerPositions: headerPositions.formattedResult,
          headerEventRowsCount: headerPositions.headerEventRowsCount,
          calendarDays,
          normalPositions,
        })
      );
    }
  }
});
