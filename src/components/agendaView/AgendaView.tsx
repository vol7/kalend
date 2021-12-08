import { AgendaViewProps } from './AgendaView.props';
import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { EVENTS_DAY_FORMAT } from '../../utils/luxonHelper';
import { OnEventClickFunc } from '../../common/interface';
import { useContext } from 'react';
import AgendaDayRow from './agendaDayRow/AgendaDayRow';

const renderAgendaEvents = (
  events: any,
  calendarDays: DateTime[],
  handleEventClick: OnEventClickFunc
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
