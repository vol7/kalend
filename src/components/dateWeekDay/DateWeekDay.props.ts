import { DateTime } from 'luxon';

export interface DateWeekDayProps {
  isSelected?: boolean;
  width: number;
  day: DateTime;
}
