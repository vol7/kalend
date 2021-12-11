import { AgendaViewProps } from './AgendaView.props';
import { CalendarDay, OnEventClickFunc } from '../../common/interface';
import { Context } from '../../context/store';
import { EVENTS_DAY_FORMAT } from '../../utils/luxonHelper';
import { useContext } from 'react';
import AgendaDayRow from './agendaDayRow/AgendaDayRow';

const renderAgendaEvents = (
  events: any,
  calendarDays: CalendarDay[],
  handleEventClick: OnEventClickFunc
) => {
  return calendarDays.map((calendarDay: CalendarDay) => {
    const hasEvents = !!events[calendarDay.date.toFormat(EVENTS_DAY_FORMAT)];
    if (hasEvents) {
      return (
        <AgendaDayRow
          key={calendarDay.date.toString()}
          day={calendarDay.date}
          events={events[calendarDay.date.toFormat(EVENTS_DAY_FORMAT)]}
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
