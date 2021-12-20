import { AgendaViewProps } from './AgendaView.props';
import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { EVENTS_DAY_FORMAT } from '../../utils/luxonHelper';
import { useContext } from 'react';
import AgendaDayRow from './agendaDayRow/AgendaDayRow';

const renderAgendaEvents = (events: any, calendarDays: DateTime[]) => {
  return calendarDays.map((calendarDay: DateTime) => {
    const hasEvents = !!events[calendarDay.toFormat(EVENTS_DAY_FORMAT)];
    if (hasEvents) {
      return (
        <AgendaDayRow
          key={calendarDay.toString()}
          day={calendarDay}
          events={events[calendarDay.toFormat(EVENTS_DAY_FORMAT)]}
        />
      );
    }
  });
};

const AgendaView = (props: AgendaViewProps) => {
  const { events } = props;
  const [store] = useContext(Context);

  const { calendarDays, height } = store;

  const agendaEvents: any = renderAgendaEvents(events, calendarDays);

  return (
    <div className={'Kalend__Agenda__container'} style={{ height }}>
      {agendaEvents}
    </div>
  );
};

export default AgendaView;
