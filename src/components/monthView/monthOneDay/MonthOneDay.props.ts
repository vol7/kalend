import { OnEventClickFunc, ShowMoreMonthFunc } from '../../../common/interface';

export interface MonthOneDayProps {
  index: number;
  data: any;
  day: any;
  handleEventClick: OnEventClickFunc;
  showMoreMonth?: ShowMoreMonthFunc;
}
