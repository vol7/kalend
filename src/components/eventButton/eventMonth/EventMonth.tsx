import React from 'react';

import { CalendarEvent } from '../../../common/interface';
import { EVENT_TYPE } from '../../../common/enums';
import EventSummary from '../components/eventSummary/EventSummary';

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
