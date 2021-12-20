import { CalendarEvent, EventLayoutMeta } from '../../common/interface';
import { DateTime } from 'luxon';
import { EVENT_TYPE } from '../../common/enums';

export interface EventButtonProps {
  event: CalendarEvent;
  type: EVENT_TYPE;
  meta?: EventLayoutMeta;
  day?: DateTime;
}
