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
      <EventTime
        isDark={isDark}
        event={event}
        type={type}
        isDarkColor={isDark}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: event.color,
            marginLeft: 8,
            marginRight: 8,
            filter: isDark ? 'saturate(60%) brightness(120%)' : 'none',
          }}
        />
      </div>
      <EventSummary
        summary={event.summary}
        isDark={isDark}
        type={type}
        isDarkColor={isDark}
        event={event}
      />
    </div>
  );
};

export default EventAgenda;
