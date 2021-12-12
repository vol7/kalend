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
  return calendarDays.map((calendarDay: DateTime) => {
    const hasEvents = !!events[calendarDay.toFormat(EVENTS_DAY_FORMAT)];
    if (hasEvents) {
      return (
        <AgendaDayRow
          key={calendarDay.toString()}
          day={calendarDay}
          events={events[calendarDay.toFormat(EVENTS_DAY_FORMAT)]}
          handleEventClick={handleEventClick}
        />
      );
    }
  });
};

const AgendaView = (props: AgendaViewProps) => {
  const { handleEventClick, events } = props;
  const [store] = useContext(Context);

  const { calendarDays, height } = store;

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
