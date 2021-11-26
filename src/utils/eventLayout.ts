/**
 * Calculate normal event positions for one day
 * @param daysNum
 * @param events
 * @param baseWidth
 * @param isDark
 * @param defaultTimezone
 */
import { EVENT_TABLE_DELIMITER_SPACE } from '../common/constants';
import { CalendarEvent, NormalEventPosition } from '../common/interface';
import { parseToDateTime } from './dateTimeParser';
import { DateTime, Interval } from 'luxon';
import { getDaysNum, parseToDate } from './calendarDays';
import { CALENDAR_VIEW } from '../common/enums';

export const calculateNormalEventPositions = (
  events: any,
  baseWidth: number,
  defaultTimezone: string,
  hourHeight: number,
  selectedView: CALENDAR_VIEW
): NormalEventPosition[] => {
  const result: NormalEventPosition[] = [];

  let offsetCount: any = []; //Store every event id of overlapping items
  let offsetCountFinal: any; //Sort events by id number
  const tableWidth: number = baseWidth / getDaysNum(selectedView);
  const tableSpace: number = (tableWidth / 100) * EVENT_TABLE_DELIMITER_SPACE;

  if (events) {
    // Filter all day events and multi day events
    events
      .filter(
        (item: any) =>
          !item.allDay &&
          // @ts-ignore
          parseToDateTime(item.endAt, item.timezoneStart)
            .diff(parseToDateTime(item.startAt, item.timezoneStart), 'days')
            .toObject().days < 1
      )
      .map((event: any) => {
        let width = 1; //Full width
        let offsetLeft = 0;
        // Compare events
        events.forEach((item2: any) => {
          if (event.id !== item2.id && !item2.allDay) {
            if (
              checkOverlappingEvents(event, item2) &&
              // @ts-ignore
              parseToDateTime(item2.endAt, item2.timezoneStart)
                .diff(
                  parseToDateTime(item2.startAt, item2.timezoneStart),
                  'days'
                )
                .toObject().days < 1
            ) {
              width = width + 1; //add width for every overlapping item
              offsetCount.push(item2.id); // set offset for positioning
              offsetCount.push(event.id); // set offset for positioning
            }
          }
        });

        const offsetTop: any =
          // @ts-ignore
          parseToDateTime(event.startAt, event.timezoneStart, defaultTimezone)
            .diff(
              parseToDateTime(
                event.startAt,
                event.timezoneStart,
                defaultTimezone
              ).set({
                hour: 0,
                minute: 0,
                second: 0,
              }),
              'minutes'
            )
            .toObject().minutes /
          (60 / hourHeight); // adjust based on hour column height

        const eventHeight: any =
          // @ts-ignore
          parseToDateTime(event.endAt, event.timezoneStart)
            .diff(
              parseToDateTime(event.startAt, event.timezoneStart),
              'minutes'
            )
            .toObject().minutes /
          (60 / hourHeight); // adjust based on hour column height

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
          event,
          height: eventHeight,
          width: Math.round(eventWidth),
          offsetLeft,
          offsetTop,
          zIndex: 2,
        });
      });
  }

  const partialResult: NormalEventPosition[] = result.map(
    (item: NormalEventPosition, index: number) => {
      // full event width
      if (item.width === tableWidth) {
        return {
          ...item,
          width: item.width - tableSpace, // add some padding,
        };
      } else if (item.offsetLeft > 0) {
        return {
          ...item,
          width: item.width,
          offsetLeft: item.offsetLeft - tableSpace,
          zIndex: item.zIndex ? item.zIndex + 2 : 2,
        };
      } else {
        return item;
      }
    }
  );

  return partialResult;
};

export const checkOverlappingEvents = (
  eventA: CalendarEvent,
  eventB: CalendarEvent
): boolean => {
  const startAtFirst: DateTime = DateTime.fromISO(eventA.startAt);
  const endAtFirst: DateTime = DateTime.fromISO(eventA.endAt);

  return Interval.fromDateTimes(startAtFirst, endAtFirst).overlaps(
    Interval.fromDateTimes(
      DateTime.fromISO(eventB.startAt),
      DateTime.fromISO(eventB.endAt)
    )
  );
};

export const checkOverlappingDatesForHeaderEvents = (
  event: CalendarEvent,
  day: DateTime
): boolean => {
  const dateStart = parseToDateTime(event.startAt, event.timezoneStart);
  const dateEnd = parseToDateTime(event.endAt, event.timezoneStart);
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

export const isEventInRange = (
  event: CalendarEvent,
  days: DateTime[]
): boolean => {
  let hasMatch = false;

  for (const day of days) {
    if (checkOverlappingDatesForHeaderEvents(event, day)) {
      hasMatch = true;
      return true;
      // return false;
    }
  }

  return hasMatch;
};
