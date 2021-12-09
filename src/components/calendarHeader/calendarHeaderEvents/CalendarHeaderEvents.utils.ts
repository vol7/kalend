import {
  CALENDAR_OFFSET_LEFT,
  EVENT_TABLE_DELIMITER_SPACE,
} from '../../../common/constants';
import { CalendarEvent, NormalEventPosition } from '../../../common/interface';
import { DateTime } from 'luxon';
import {
  checkOverlappingDatesForHeaderEvents,
  checkOverlappingEvents,
  isEventInRange,
} from '../../../utils/eventLayout';
import { isAllDayEvent } from '../../../utils/common';

export const calculatePositionForHeaderEvents = (
  events: any,
  width: number,
  calendarDays: DateTime[]
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

  Object.entries(events).map(([key, items]) => {
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
  headerEventsFiltered.forEach((event) => {
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
        event,
        eventToCompare
      );

      // found not overlapping matching event
      if (!isOverlapping) {
        let isMatchingAll = true;
        // compare match with other stored events for same row
        rowWithNotOverlappingEvents.forEach((itemFromRow) => {
          const isOverlappingAll: boolean = checkOverlappingEvents(
            itemFromRow,
            eventToCompare
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
      let overlapCounter = 0;

      calendarDays.forEach((day) => {
        if (checkOverlappingDatesForHeaderEvents(item, day)) {
          // set base offset only for first item
          eventWidth += width;
          hasMatchingDay = true;
          overlapCounter += 1; // remove
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
