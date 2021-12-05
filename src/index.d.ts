import { CALENDAR_VIEW } from './common/enums';
import { OnEventClickFunc, OnNewEventClickFunc } from './common/interface';

export interface CalendProps {
  initialDate?: string;
  initialView: CALENDAR_VIEW;
  events: any;
  isDark?: boolean;
  hourHeight?: number;
  onNewEventClick: OnNewEventClickFunc;
  onEventClick: OnEventClickFunc;
}
