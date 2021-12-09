import {
  OnEventClickFunc,
  OnEventDragFinishFunc,
  OnNewEventClickFunc,
} from '../../common/interface';

export interface DaysViewTableProps {
  handleNewEventClick: OnNewEventClickFunc;
  handleEventClick: OnEventClickFunc;
  events: any;
  onEventDragFinish?: OnEventDragFinishFunc;
}
