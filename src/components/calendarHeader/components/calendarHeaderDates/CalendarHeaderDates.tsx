import React, { useContext } from 'react';
import { DateTime } from 'luxon';

import { Context } from '../../../../context/store';
import CalendarHeaderColText from '../calendarHeaderColText/CalendarHeaderColText';
import CalendarHeaderCol from '../calendarHeaderCol/CalendarHeaderCol';
import LuxonHelper from '../../../../utils/luxonHelper';
import { CALENDAR_VIEW } from '../../../../common/enums';

interface CalendarHeaderDatesProps {
  daysNum: number;
}
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

  const dayTextColumnWidth: any = {
    width: colWidth,
  };

  const renderNumericDays = () =>
    calendarDays.map((day: DateTime) => {
      const isDayToday: boolean = LuxonHelper.isToday(day);
      const isSelected: boolean =
        LuxonHelper.isSameDay(day, selectedDate) &&
        calendarView === CALENDAR_VIEW.DAY &&
        !isDayToday;

      return (
        <div
          key={day.toString()}
          className={'Calend__CalendarHeaderDates__col'}
          style={dayTextColumnWidth}
        >
          <div
            className={`Calend__CalendarHeaderDates__circle${
              isDayToday ? '-today' : ''
            }${isSelected ? '-selected' : ''}${isDark ? '-dark' : ''}`}
          >
            <p
              className={`Calend__text Calend__CalendarHeaderDates__text${
                isDayToday || isSelected ? '-today' : ''
              }${isDark ? '-dark' : ''}`}
            >
              {day.day}
            </p>
          </div>
        </div>
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
