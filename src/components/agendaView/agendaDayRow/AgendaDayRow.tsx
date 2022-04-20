import { AgendaDayRowProps } from './AgendaDayRow.props';
import { CalendarEvent } from '../../../common/interface';
import { Context } from '../../../context/store';
import { DateTime } from 'luxon';
import { EVENT_TYPE } from '../../../common/enums';
import { ReactNode, useContext, useEffect } from 'react';
import DateWeekDay from '../../dateWeekDay/DateWeekDay';
import DayOfWeekText from '../../dayOfWeekText/DayOfWeekText';
import EventButton from '../../eventButton/EventButton';

const renderEvents = (events: CalendarEvent[], timezone: string) => {
  if (!events || events.length === 0) {
    return [];
  }

  const allDayEvents: CalendarEvent[] = [];
  const normalEvents: CalendarEvent[] = [];

  events?.forEach((item) => {
    if (item.allDay) {
      allDayEvents.push(item);
    } else {
      normalEvents.push(item);
    }
  });

  let sortedEvents: CalendarEvent[] = normalEvents?.sort((a, b) => {
    return (
      DateTime.fromISO(a.startAt)
        .setZone(a.timezoneStartAt || timezone)
        .toMillis() -
      DateTime.fromISO(b.startAt)
        .setZone(b.timezoneStartAt || timezone)
        .toMillis()
    );
  });

  sortedEvents = [...allDayEvents, ...sortedEvents];

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
  const { day, events, scrollToThis } = props;
  const [store] = useContext(Context);
  const dayEvents: ReactNode = renderEvents(events, store.config.timezone);

  useEffect(() => {
    if (!store.config.autoScroll) {
      return;
    }

    if (scrollToThis) {
      const element = document.getElementById(day.toString());
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);

  return (
    <div className={'Kalend__AgendaDayRow__container'} id={day.toString()}>
      <div className={'Kalend__AgendaDayRow__container-day'}>
        <DayOfWeekText day={day} width={50} />
        <DateWeekDay width={50} day={day} />
      </div>
      <div className={'Kalend__AgendaDayRow__events'}>{dayEvents}</div>
    </div>
  );
};

export default AgendaDayRow;
