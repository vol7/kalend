import { AgendaDayRowProps } from './AgendaDayRow.props';
import { CalendarEvent } from '../../../common/interface';
import { DateTime } from 'luxon';
import { EVENT_TYPE } from '../../../common/enums';
import { ReactNode } from 'react';
import DateWeekDay from '../../dateWeekDay/DateWeekDay';
import DayOfWeekText from '../../dayOfWeekText/DayOfWeekText';
import EventButton from '../../eventButton/EventButton';

const renderEvents = (events: CalendarEvent[]) => {
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
        key={`${event.id}${event.internalID ? event.internalID : ''}`}
        item={{ event }}
        type={EVENT_TYPE.AGENDA}
      />
    );
  });
};

const AgendaDayRow = (props: AgendaDayRowProps) => {
  const { day, events } = props;

  const dayEvents: ReactNode = renderEvents(events);

  return (
    <div className={'Kalend__AgendaDayRow__container'}>
      <div className={'Kalend__AgendaDayRow__container-day'}>
        <DayOfWeekText day={day} width={50} />
        <DateWeekDay width={50} day={day} />
      </div>
      <div className={'Kalend__AgendaDayRow__events'}>{dayEvents}</div>
    </div>
  );
};

export default AgendaDayRow;
