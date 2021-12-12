import { EVENT_TYPE } from '../../../../common/enums';
import { parseCssDark } from '../../../../utils/common';

interface EventSummaryProps {
  isDark: boolean;
  summary: string;
  type: EVENT_TYPE;
}

const EventSummary = (props: EventSummaryProps) => {
  const { isDark, summary, type } = props;

  return (
    <p
      className={`Kalend__text ${parseCssDark(
        'Kalend__Event__summary',
        isDark
      )} Kalend__Event__summary__type-${type}`}
    >
      {summary}{' '}
    </p>
  );
};

export default EventSummary;
