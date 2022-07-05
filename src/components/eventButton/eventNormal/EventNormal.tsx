import { CalendarEvent, EventLayoutMeta } from '../../../common/interface';
import { EVENT_TYPE } from '../../../common/enums';
import EventSummary from '../components/eventSummary/EventSummary';
import EventTime from '../components/eventTime/EventTime';

interface EventNormalProps {
  event: CalendarEvent;
  isDark: boolean;
  type: EVENT_TYPE;
  meta?: EventLayoutMeta;
  endAt?: string;
  isDarkColor?: boolean;
  height: number;
}

const EventNormal = (props: EventNormalProps) => {
  const { isDark, event, type, meta, endAt, isDarkColor, height } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '-webkit-fill-available',
      }}
    >
      <EventSummary
        summary={event.summary}
        isDark={isDark}
        type={type}
        isDarkColor={isDarkColor}
        event={event}
        height={height}
      />

      {meta?.showTime ? (
        <EventTime
          isDark={isDark}
          event={event}
          type={EVENT_TYPE.NORMAL}
          endAt={endAt}
          isDarkColor={isDarkColor}
        />
      ) : null}
    </div>
  );
};

export default EventNormal;
