import { EVENT_TYPE } from '../../../../common/enums';
import { parseCssDark } from '../../../../utils/common';

interface EventSummaryProps {
  isDark: boolean;
  summary: string;
  type: EVENT_TYPE;
  isDarkColor?: boolean;
  event: any;
}

const EventSummary = (props: EventSummaryProps) => {
  const { isDark, summary, type, isDarkColor, event } = props;

  const style = {
    color: event.style?.color ? event.style.color : 'inherit',
  };

  return (
    <p
      className={` Kalend__text ${parseCssDark(
        'Kalend__Event__summary',
        isDark
      )} ${parseCssDark(`Kalend__Event__summary__type-${type}`, isDark)} ${
        isDarkColor ? 'Kalend__text-light' : 'Kalend__text-dark'
      }`}
      style={style}
    >
      {summary}{' '}
    </p>
  );
};

export default EventSummary;
