import React from 'react';
import { DateTime } from 'luxon';
import DateWeekDay from '../../dateWeekDay/DateWeekDay';
import { CalendarEvent, HandleEventClickFunc } from '../../../common/interface';
import EventButton from '../../eventButton/EventButton';
import { EVENT_TYPE } from '../../../common/enums';
import DayOfWeekText from '../../dayOfWeekText/DayOfWeekText';

const renderEvents = (
  events: CalendarEvent[],
  handleEventClick: HandleEventClickFunc
) => {
  return events.map((event) => {
    return (
      <EventButton
        key={event.id}
        event={event}
        eventWidth={'100%'}
        type={EVENT_TYPE.AGENDA}
        handleEventClick={handleEventClick}
        zIndex={1}
      />
    );
  });
};

interface AgendaDayRowProps {
  day: DateTime;
  events: CalendarEvent[];
  handleEventClick: HandleEventClickFunc;
}
const AgendaDayRow = (props: AgendaDayRowProps) => {
  const { day, events, handleEventClick } = props;

  const dayEvents: any = renderEvents(events, handleEventClick);

  return (
    <div className={'Calend__AgendaDayRow__container'}>
      <div className={'Calend__AgendaDayRow__container-day'}>
        <DayOfWeekText day={day} width={50} />
        <DateWeekDay width={50} day={day} />
      </div>
      <div className={'Calend__AgendaDayRow__events'}>{dayEvents}</div>
    </div>
  );
};

export default AgendaDayRow;
