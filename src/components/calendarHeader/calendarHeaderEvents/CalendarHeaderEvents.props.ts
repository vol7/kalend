import {
  OnEventClickFunc,
  OnEventDragFinishFunc,
} from '../../../common/interface';

export interface CalendarHeaderEventsProps {
  handleEventClick: OnEventClickFunc;
  events: any;
  onEventDragFinish?: OnEventDragFinishFunc;
}
