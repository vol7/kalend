import { CALENDAR_VIEW } from '../../../../common/enums';
import { CalendarHeaderDatesProps } from './CalendarHeaderDates.props';
import { Context } from '../../../../context/store';
import { DateTime } from 'luxon';
import { getCorrectWidth } from '../../../../utils/common';
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
  const {
    calendarDays,
    selectedDate,
    calendarView,
    width,
    isMobile,
    selectedView,
  } = store;

  const { daysNum } = props;

  const colWidth: number =
    getCorrectWidth(width, isMobile, selectedView) / daysNum;

  const renderNumericDays = () =>
    calendarDays.map((calendarDay: DateTime) => {
      const isDayToday: boolean = LuxonHelper.isToday(calendarDay);
      const isSelected: boolean =
        LuxonHelper.isSameDay(calendarDay, selectedDate) &&
        calendarView === CALENDAR_VIEW.DAY &&
        !isDayToday;

      return (
        <DateWeekDay
          key={calendarDay.toString()}
          width={colWidth}
          day={calendarDay}
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
