import {
  CALENDAR_OFFSET_LEFT,
  EVENT_TABLE_DELIMITER_SPACE,
} from '../../../common/constants';
import {
  CalendarDay,
  CalendarEvent,
  NormalEventPosition,
} from '../../../common/interface';
import { DateTime } from 'luxon';
import {
  checkOverlappingDatesForHeaderEvents,
  checkOverlappingEvents,
  isEventInRange,
} from '../../../utils/eventLayout';
import { isAllDayEvent } from '../../../utils/common';

// adjust start and end date for header event to full day for correct layout
// calculations
const stretchHeaderEventTimes = (event: CalendarEvent): CalendarEvent => {
  return {
    ...event,
    startAt: DateTime.fromISO(event.startAt)
      .set({ hour: 0, minute: 0, second: 1 })
      .toString(),
    endAt: DateTime.fromISO(event.endAt)
      .set({ hour: 23, minute: 59, second: 59 })
      .toString(),
  };
};

export const calculatePositionForHeaderEvents = (
  events: any,
  width: number,
  calendarDays: CalendarDay[]
): NormalEventPosition[][] => {
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
        const isInRange: boolean = isEventInRange(item, calendarDays);
        if (isInRange) {
          // correct position when external event ends in next day
          headerEventsFiltered.push(item);
        }
      }
    });
  });

  // find all matching events to fit in one row
  headerEventsFiltered?.forEach((event) => {
    const eventPositionResult: NormalEventPosition[] = [];
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
        stretchHeaderEventTimes(event),
        stretchHeaderEventTimes(eventToCompare)
      );

      // found not overlapping matching event
      if (!isOverlapping) {
        let isMatchingAll = true;
        // compare match with other stored events for same row
        rowWithNotOverlappingEvents.forEach((itemFromRow) => {
          const isOverlappingAll: boolean = checkOverlappingEvents(
            stretchHeaderEventTimes(itemFromRow),
            stretchHeaderEventTimes(eventToCompare)
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
        if (checkOverlappingDatesForHeaderEvents(item, day.date)) {
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
      const eventPositionData: NormalEventPosition = {
        event: item,
        width: Math.round(eventWidth - tableSpace),
        offsetLeft: offset + CALENDAR_OFFSET_LEFT,
        offsetTop: 0,
        height: 40,
        zIndex: 2,
      };

      eventPositionResult.push(eventPositionData);
    });

    // save row to result
    result.push(eventPositionResult);
  });

  return result;
};
