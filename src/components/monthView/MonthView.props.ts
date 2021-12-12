import { OnEventClickFunc, ShowMoreMonthFunc } from '../../common/interface';

export interface MonthViewProps {
  handleEventClick: OnEventClickFunc;
  showMoreMonth?: ShowMoreMonthFunc;
  events?: any;
}
