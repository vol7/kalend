import { EVENT_TYPE } from '../../../../common/enums';
import { parseCssDark } from '../../../../utils/common';

interface EventSummaryProps {
  isDark: boolean;
  summary: string;
  type: EVENT_TYPE;
  isDarkColor?: boolean;
}

const EventSummary = (props: EventSummaryProps) => {
  const { isDark, summary, type, isDarkColor } = props;

  return (
    <p
      className={` Kalend__text ${parseCssDark(
        'Kalend__Event__summary',
        isDark
      )} ${parseCssDark(`Kalend__Event__summary__type-${type}`, isDark)} ${
        isDarkColor ? 'Kalend__text-light' : 'Kalend__text-dark'
      }`}
    >
      {summary}{' '}
    </p>
  );
};

export default EventSummary;
