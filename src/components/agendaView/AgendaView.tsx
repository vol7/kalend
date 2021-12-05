import React, { useContext } from 'react';
import { CalendarEvent, HandleEventClickFunc } from '../../common/interface';
import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { EVENTS_DAY_FORMAT } from '../../utils/luxonHelper';
import AgendaDayRow from './agendaDayRow/AgendaDayRow';

const renderAgendaEvents = (
  events: any,
  calendarDays: DateTime[],
  handleEventClick: HandleEventClickFunc
) => {
  return calendarDays.map((day: DateTime) => {
    const hasEvents = !!events[day.toFormat(EVENTS_DAY_FORMAT)];
    if (hasEvents) {
      return (
        <AgendaDayRow
          key={day.toString()}
          day={day}
          events={events[day.toFormat(EVENTS_DAY_FORMAT)]}
          handleEventClick={handleEventClick}
        />
      );
    }
  });
};

interface AgendaViewProps {
  handleEventClick: HandleEventClickFunc;
}

const AgendaView = (props: AgendaViewProps) => {
  const { handleEventClick } = props;
  const [store] = useContext(Context);

  const { events, calendarDays, height } = store;

  const agendaEvents: any = renderAgendaEvents(
    events,
    calendarDays,
    handleEventClick
  );

  return (
    <div className={'Calend__Agenda__container'} style={{ height }}>
      {agendaEvents}
    </div>
  );
};

export default AgendaView;
