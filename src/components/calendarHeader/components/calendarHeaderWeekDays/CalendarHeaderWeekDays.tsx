import React, { useContext } from 'react';
import { DateTime } from 'luxon';

import { Context } from '../../../../context/store';
import { daysText } from '../../../../utils/calendarDays';
import { CALENDAR_VIEW } from '../../../../common/enums';
import DayOfWeekText from '../../../dayOfWeekText/DayOfWeekText';

interface CalendarHeaderDaysTextProps {
  daysNum: number;
  days: DateTime[];
  width: number;
}
/**
 * Render text representation of days
 *
 * @param props
 * @constructor
 */
const CalendarHeaderWeekDays = (props: CalendarHeaderDaysTextProps) => {
  const { daysNum, days } = props;

  const [store] = useContext(Context);
  const { calendarDays, width, selectedView } = store;

  const isMonthView: boolean = selectedView === CALENDAR_VIEW.MONTH;

  const colWidth: number = width / daysNum;

  const renderDaysText = () => {
    const dayTextColumnWidth: any = {
      width: colWidth,
    };

    if (isMonthView) {
      return daysText.map((day: string) => (
        <div
          key={day}
          className={'Calend__CalendarHeaderWeekDays__col'}
          style={dayTextColumnWidth}
        >
          <p className={'Calend__text Calend__CalendarHeaderWeekDays__text'}>
            {day}
          </p>
        </div>
      ));
    }

    return days.map((day: DateTime) => (
      <DayOfWeekText key={day.toString()} day={day} width={colWidth} />
    ));
  };
  const namesForDays: any = renderDaysText();

  return (
    <div className={'Calend__CalendarHeaderWeekDays__wrapper'}>
      <div className={'Calend__CalendarHeaderWeekDays__container'}>
        {namesForDays}
      </div>
    </div>
  );
};

export default CalendarHeaderWeekDays;
