import { CalendarEvent, OnEventClickFunc } from '../../../common/interface';
import { DateTime } from 'luxon';

export interface AgendaDayRowProps {
  day: DateTime;
  events: CalendarEvent[];
  handleEventClick: OnEventClickFunc;
}
