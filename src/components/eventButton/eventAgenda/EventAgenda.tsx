import { CalendarEvent } from '../../../common/interface';
import { EVENT_TYPE } from '../../../common/enums';
import EventSummary from '../components/eventSummary/EventSummary';
import EventTime from '../components/eventTime/EventTime';

interface EventAgendaProps {
  event: CalendarEvent;
  isDark: boolean;
  type: EVENT_TYPE;
}

const EventAgenda = (props: EventAgendaProps) => {
  const { isDark, event, type } = props;

  return (
    <div className={'Kalend__EventAgenda__container'}>
      <EventSummary summary={event.summary} isDark={isDark} type={type} />
      <EventTime isDark={isDark} event={event} type={type} />
    </div>
  );
};

export default EventAgenda;
