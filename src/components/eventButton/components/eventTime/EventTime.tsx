import React from 'react';

import './EventTime.scss';

import { DateTime } from 'luxon';
import { CalendarEvent } from '../../../../common/interface';
import { parseToDateTime } from '../../../../utils/dateTimeParser';
import { EVENT_TYPE } from '../../../../common/enums';
import { parseCssDark } from '../../../../utils/common';

const TIME_FORMAT = 'HH:mm';

const formatEventTime = (event: CalendarEvent): string => {
  const { startAt, endAt, timezoneStart } = event;

  const startAtDateTime: DateTime = parseToDateTime(startAt, timezoneStart);
  const endAtDateTime: DateTime = parseToDateTime(endAt, timezoneStart);

  return `${startAtDateTime.toFormat(TIME_FORMAT)} - ${endAtDateTime.toFormat(
    TIME_FORMAT
  )}`;
};

const formatEventTimeV2 = (
  event: CalendarEvent
): { start: string; end: string } => {
  const { startAt, endAt, timezoneStart } = event;

  const startAtDateTime: DateTime = parseToDateTime(startAt, timezoneStart);
  const endAtDateTime: DateTime = parseToDateTime(endAt, timezoneStart);

  return {
    start: `${startAtDateTime.toFormat(TIME_FORMAT)}`,
    end: `${endAtDateTime.toFormat(TIME_FORMAT)}`,
  };
};

interface EventTimeProps {
  isDark: boolean;
  event: CalendarEvent;
  type: EVENT_TYPE;
}

const EventTime = (props: EventTimeProps) => {
  const { isDark, event, type } = props;

  const timeV2: any = formatEventTimeV2(event);
  // const time: string = formatEventTime(event);
  return (
    <p
      className={`${parseCssDark(
        'Event__time',
        isDark
      )} Event__time__type-${type}`}
    >
      {timeV2.start} - {timeV2.end}
    </p>
  );
};

export default EventTime;
