import DateWeekDay from '../../dateWeekDay/DateWeekDay';
import { CalendarEvent, OnEventClickFunc } from '../../../common/interface';
import EventButton from '../../eventButton/EventButton';
import { EVENT_TYPE } from '../../../common/enums';
import DayOfWeekText from '../../dayOfWeekText/DayOfWeekText';
import { AgendaDayRowProps } from './AgendaDayRow.props';
import { ReactNode } from 'react';

const renderEvents = (
  events: CalendarEvent[],
  handleEventClick: OnEventClickFunc
) => {
  if (!events || events.length === 0) {
    return [];
  }

  const sortedEvents: CalendarEvent[] = events?.sort((a, b) => {
    return (
      DateTime.fromISO(a.startAt).toMillis() -
      DateTime.fromISO(b.startAt).toMillis()
    );
  });

  return sortedEvents.map((event) => {
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

const AgendaDayRow = (props: AgendaDayRowProps) => {
  const { day, events, handleEventClick } = props;

  const dayEvents: ReactNode = renderEvents(events, handleEventClick);

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
