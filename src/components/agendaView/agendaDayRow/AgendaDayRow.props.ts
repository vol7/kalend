import { DateTime } from 'luxon';
import { CalendarEvent, OnEventClickFunc } from '../../../common/interface';

export interface AgendaDayRowProps {
  day: DateTime;
  events: CalendarEvent[];
  handleEventClick: OnEventClickFunc;
}
