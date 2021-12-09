import {
  OnEventClickFunc,
  OnEventDragFinishFunc,
} from '../../common/interface';

export interface CalendarHeaderProps {
  handleEventClick: OnEventClickFunc;
  onEventDragFinish?: OnEventDragFinishFunc;
  events: any;
}
