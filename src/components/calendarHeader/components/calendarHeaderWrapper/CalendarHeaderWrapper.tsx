import { useContext } from 'react';
import { Context } from '../../../../context/store';
import { CALENDAR_OFFSET_LEFT } from '../../../../utils/calendarDays';
import { parseCssDark } from '../../../../utils/common';
import { CalendarHeaderWrapperProps } from './CalendarHeaderWrapper.props';

const CalendarHeaderWrapper = (props: CalendarHeaderWrapperProps) => {
  const { children, isMonthView } = props;

  const [store] = useContext(Context);
  const { isDark } = store;

  const headerStyle = {
    paddingLeft: isMonthView ? 0 : CALENDAR_OFFSET_LEFT,
  };

  return (
    <div
      className={parseCssDark('Calend__CalendarHeaderCol', isDark)}
      style={headerStyle}
    >
      {children}
    </div>
  );
};

export default CalendarHeaderWrapper;
