import {
  CalendarEvent,
  EventLayoutMeta,
  OnEventClickFunc,
  OnEventDragFinishFunc,
} from '../../common/interface';
import { DateTime } from 'luxon';
import { EVENT_TYPE } from '../../common/enums';

export interface EventButtonProps {
  event: CalendarEvent;
  type: EVENT_TYPE;
  handleEventClick: OnEventClickFunc;
  meta?: EventLayoutMeta;
  day?: DateTime;
  onEventDragFinish?: OnEventDragFinishFunc;
}
