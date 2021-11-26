import { CALENDAR_VIEW } from './common/enums';
import { CalendarEvent, Config, NewEventClickData } from './common/interface';

export interface CalendProps {
  initialDate?: string;
  initialView: CALENDAR_VIEW;
  events: any;
  isDark?: boolean;
  hourHeight?: number;
  onNewEventClick: (data: NewEventClickData) => void;
  onEventClick: (data: CalendarEvent) => void;
}
