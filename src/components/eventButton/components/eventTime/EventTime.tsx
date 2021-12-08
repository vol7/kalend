import React, { useContext } from 'react';

import { CalendarEvent } from '../../../../common/interface';
import { Context } from '../../../../context/store';
import { DateTime } from 'luxon';
import { EVENT_TYPE } from '../../../../common/enums';
import { parseCssDark } from '../../../../utils/common';
import { parseToDateTime } from '../../../../utils/dateTimeParser';

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
  event: CalendarEvent,
  timezone?: string
): { start: string; end: string } => {
  const { startAt, endAt, timezoneStart } = event;

  const startAtDateTime: DateTime = parseToDateTime(
    startAt,
    timezoneStart,
    timezone
  );
  const endAtDateTime: DateTime = parseToDateTime(
    endAt,
    timezoneStart,
    timezone
  );

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

  const [store] = useContext(Context);
  const { timezone } = store;

  const timeV2: any = formatEventTimeV2(event, timezone);
  // const time: string = formatEventTime(event);
  return (
    <p
      className={`Calend__text ${parseCssDark(
        'Calend__Event__time',
        isDark
      )} Calend__Event__time__type-${type}`}
    >
      {timeV2.start} - {timeV2.end}
    </p>
  );
};

export default EventTime;
