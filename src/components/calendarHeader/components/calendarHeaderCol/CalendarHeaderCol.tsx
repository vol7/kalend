import { useContext } from 'react';
import { Context } from '../../../../context/store';
import { parseCssDark } from '../../../../utils/common';
import { CalendarHeaderColProps } from './CalendarHeaderCol.props';

const CalendarHeaderCol = (props: CalendarHeaderColProps) => {
  const { children } = props;

  const [store] = useContext(Context);
  const { isDark } = store;

  return (
    <div className={parseCssDark('Calend__CalendarHeaderCol', isDark)}>
      {children}
    </div>
  );
};

export default CalendarHeaderCol;
