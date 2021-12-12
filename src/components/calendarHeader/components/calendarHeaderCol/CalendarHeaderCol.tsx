import { CalendarHeaderColProps } from './CalendarHeaderCol.props';
import { Context } from '../../../../context/store';
import { parseCssDark } from '../../../../utils/common';
import { useContext } from 'react';

const CalendarHeaderCol = (props: CalendarHeaderColProps) => {
  const { children } = props;

  const [store] = useContext(Context);
  const { isDark } = store;

  return (
    <div className={parseCssDark('Kalend__CalendarHeaderCol', isDark)}>
      {children}
    </div>
  );
};

export default CalendarHeaderCol;
