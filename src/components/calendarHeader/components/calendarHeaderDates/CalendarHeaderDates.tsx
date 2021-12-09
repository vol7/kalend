import { CALENDAR_VIEW } from '../../../../common/enums';
import { CalendarHeaderDatesProps } from './CalendarHeaderDates.props';
import { Context } from '../../../../context/store';
import { DateTime } from 'luxon';
import { useContext } from 'react';
import CalendarHeaderCol from '../calendarHeaderCol/CalendarHeaderCol';
import CalendarHeaderColText from '../calendarHeaderColText/CalendarHeaderColText';
import DateWeekDay from '../../../dateWeekDay/DateWeekDay';
import LuxonHelper from '../../../../utils/luxonHelper';

/**
 * Get numeric representation of days
 *
 * @param props
 * @constructor
 */
const CalendarHeaderDates = (props: CalendarHeaderDatesProps) => {
  const [store] = useContext(Context);
  const { calendarDays, selectedDate, calendarView, width } = store;

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
