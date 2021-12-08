import { useContext } from 'react';
import { DateTime } from 'luxon';
import { Context } from '../../../../context/store';
import CalendarHeaderColText from '../calendarHeaderColText/CalendarHeaderColText';
import CalendarHeaderCol from '../calendarHeaderCol/CalendarHeaderCol';
import LuxonHelper from '../../../../utils/luxonHelper';
import { CALENDAR_VIEW } from '../../../../common/enums';
import DateWeekDay from '../../../dateWeekDay/DateWeekDay';
import { CalendarHeaderDatesProps } from './CalendarHeaderDates.props';

/**
 * Get numeric representation of days
 *
 * @param props
 * @constructor
 */
const CalendarHeaderDates = (props: CalendarHeaderDatesProps) => {
  const [store] = useContext(Context);
  const { isDark, calendarDays, selectedDate, calendarView, width } = store;

  const { daysNum } = props;

  const colWidth: number = width / daysNum;

  const renderNumericDays = () =>
    calendarDays.map((day: DateTime) => {
      const isDayToday: boolean = LuxonHelper.isToday(day);
      const isSelected: boolean =
        LuxonHelper.isSameDay(day, selectedDate) &&
        calendarView === CALENDAR_VIEW.DAY &&
        !isDayToday;

      return (
        <DateWeekDay
          key={day.toString()}
          width={colWidth}
          day={day}
          isSelected={isSelected}
        />
      );
    });

  const numericDays: any = renderNumericDays();

  return (
    <CalendarHeaderCol>
      <CalendarHeaderColText>{numericDays}</CalendarHeaderColText>
    </CalendarHeaderCol>
  );
};

export default CalendarHeaderDates;
