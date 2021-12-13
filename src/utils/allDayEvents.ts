import { CalendarEvent } from '../common/interface';
import { DateTime } from 'luxon';
import { parseToDateTime } from './dateTimeParser';

export const parseAllDayEvent = (
  event: CalendarEvent,
  timezone: string
): CalendarEvent => {
  const startAtDateTime: DateTime = parseToDateTime(
    event.startAt,
    event.timezoneStartAt || timezone
  );
  const endAtDateTime: DateTime = parseToDateTime(
    event.endAt,
    event.timezoneStartAt || timezone
  );

  return {
    ...event,
    allDay:
      endAtDateTime
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .toString() !==
      startAtDateTime
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .toString(),
  };
};

export const parseAllDayEvents = (events: any, timezone: string) => {
  const result: any = {};

  if (!events) {
    return {};
  }

  Object.entries(events).forEach((keyValue: any) => {
    const eventsItems: CalendarEvent[] = keyValue[1];

    eventsItems.forEach((item: CalendarEvent) => {
      const dateKey: any = parseToDateTime(
        item.startAt,
        item.timezoneStartAt || timezone
      ).toFormat('dd-MM-yyyy');

      if (result[dateKey]) {
        result[dateKey] = [
          ...result[dateKey],
          ...[parseAllDayEvent(item, timezone)],
        ];
      } else {
        result[dateKey] = [parseAllDayEvent(item, timezone)];
      }
    });
  });

  return result;
};
