import React, { useContext } from 'react';

import CalendarHeaderWeekDays from '../components/calendarHeaderWeekDays/CalendarHeaderWeekDays';
import CalendarHeaderColText from '../components/calendarHeaderColText/CalendarHeaderColText';
import CalendarHeaderDates from '../components/calendarHeaderDates/CalendarHeaderDates';
import CalendarHeaderWrapper from '../components/calendarHeaderWrapper/CalendarHeaderWrapper';
import { Context } from '../../../context/store';

interface CalendarHeaderDaysProps {
  width: number;
  isMonthView: boolean;
}
const CalendarHeaderDays = (props: CalendarHeaderDaysProps) => {
  const { isMonthView } = props;

  const [store] = useContext(Context);
  const { calendarDays, width } = store;

  const daysNum: number = isMonthView ? 7 : calendarDays.length;

  return (
    <CalendarHeaderWrapper isMonthView={isMonthView}>
      <CalendarHeaderColText>
        <CalendarHeaderWeekDays
          width={width}
          daysNum={daysNum}
          days={calendarDays}
        />
      </CalendarHeaderColText>
      {!isMonthView ? (
        <CalendarHeaderColText>
          <CalendarHeaderDates daysNum={daysNum} />
        </CalendarHeaderColText>
      ) : null}
    </CalendarHeaderWrapper>
  );
};

export default CalendarHeaderDays;
