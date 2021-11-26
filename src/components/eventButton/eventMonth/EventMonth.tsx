import React from 'react';

import EventSummary from '../components/eventSummary/EventSummary';
import { EVENT_TYPE } from '../../../common/enums';
import { CalendarEvent } from '../../../common/interface';

interface EventMonthProps {
  event: CalendarEvent;
  isDark: boolean;
  type: EVENT_TYPE;
}

const EventMonth = (props: EventMonthProps) => {
  const { isDark, event, type } = props;

  return <EventSummary summary={event.summary} isDark={isDark} type={type} />;
};

export default EventMonth;
