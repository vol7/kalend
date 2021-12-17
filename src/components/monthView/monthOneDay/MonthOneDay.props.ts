import { DateTime } from 'luxon';
import {
  OnEventClickFunc,
  OnEventDragFinishFunc,
  ShowMoreMonthFunc,
} from '../../../common/interface';

export interface MonthOneDayProps {
  index: number;
  data: any;
  day: DateTime;
  handleEventClick: OnEventClickFunc;
  showMoreMonth?: ShowMoreMonthFunc;
  onEventDragFinish?: OnEventDragFinishFunc;
}
