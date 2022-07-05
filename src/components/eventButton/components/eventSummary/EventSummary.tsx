import { EVENT_TYPE } from '../../../../common/enums';
import { parseCssDark } from '../../../../utils/common';
import { parseEventString } from '../../../../utils/reactUtils';

interface EventSummaryProps {
  isDark: boolean;
  summary: string;
  type: EVENT_TYPE;
  isDarkColor?: boolean;
  event: any;
  height?: number;
}

const parseFontSize = (height: number) => {
  if (height < 10) {
    return 7;
  } else if (height < 15) {
    return 9;
  } else if (height < 20) {
    return 11;
  } else {
    return 13;
  }
};

const EventSummary = (props: EventSummaryProps) => {
  const { isDark, summary, type, isDarkColor, event, height } = props;

  const style: any = {
    color: event.style?.color ? event.style.color : 'inherit',
  };

  if (height) {
    style.fontSize = parseFontSize(height);

    // adjust for smaller event container
    if (height <= 10) {
      style.paddingTop = 0;
      style.lineHeight = 'normal';
      style.height = '100%';
    }
  }

  return parseEventString(
    summary,
    ` Kalend__text ${parseCssDark(
      'Kalend__Event__summary',
      isDark
    )} ${parseCssDark(`Kalend__Event__summary__type-${type}`, isDark)} ${
      isDarkColor ? 'Kalend__text-light' : 'Kalend__text-dark'
    }`,
    style
  );
};

export default EventSummary;
