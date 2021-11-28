import React from 'react';

import EventSummary from '../components/eventSummary/EventSummary';
import { CalendarEvent } from '../../../common/interface';
import { EVENT_TYPE } from '../../../common/enums';
import EventTime from '../components/eventTime/EventTime';

interface EventNormalProps {
  event: CalendarEvent;
  isDark: boolean;
  type: EVENT_TYPE;
}

const EventNormal = (props: EventNormalProps) => {
  const { isDark, event, type } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <EventSummary summary={event.summary} isDark={isDark} type={type} />
      <EventTime isDark={isDark} event={event} type={EVENT_TYPE.NORMAL} />
    </div>
  );
};

export default EventNormal;
