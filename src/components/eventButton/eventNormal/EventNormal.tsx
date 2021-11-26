import React from 'react';

import EventSummary from '../components/eventSummary/EventSummary';
import { CalendarEvent } from '../../../common/interface';
import { EVENT_TYPE } from '../../../common/enums';

interface EventNormalProps {
  event: CalendarEvent;
  isDark: boolean;
  type: EVENT_TYPE;
}

const EventNormal = (props: EventNormalProps) => {
  const { isDark, event, type } = props;

  return <EventSummary summary={event.summary} isDark={isDark} type={type} />;
};

export default EventNormal;
