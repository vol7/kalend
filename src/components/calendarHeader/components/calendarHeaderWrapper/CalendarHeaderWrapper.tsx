import { CALENDAR_OFFSET_LEFT } from '../../../../common/constants';
import { CalendarHeaderWrapperProps } from './CalendarHeaderWrapper.props';
import { Context } from '../../../../context/store';
import { parseCssDark } from '../../../../utils/common';
import { useContext } from 'react';

const CalendarHeaderWrapper = (props: CalendarHeaderWrapperProps) => {
  const { children, isMonthView } = props;

  const [store] = useContext(Context);
  const { width, isDark } = store;

  const headerStyle = {
    paddingLeft: isMonthView ? 0 : CALENDAR_OFFSET_LEFT,
    width,
  };

  return (
    <div
      className={parseCssDark('Kalend__CalendarHeaderCol', isDark)}
      style={headerStyle}
    >
      {children}
    </div>
  );
};

export default CalendarHeaderWrapper;
