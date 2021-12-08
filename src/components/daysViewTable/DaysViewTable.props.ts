import { OnEventClickFunc, OnNewEventClickFunc } from '../../common/interface';

export interface DaysViewTableProps {
  handleNewEventClick: OnNewEventClickFunc;
  handleEventClick: OnEventClickFunc;
}
