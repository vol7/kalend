import { Context } from '../../context/store';
import { DateTime } from 'luxon';

import { MonthViewProps } from './MonthView.props';
import {
  calculateMonthPositions,
  getMonthRows,
} from './monthWeekRow/MonthWeekRow.utils';
import { useContext, useEffect } from 'react';
import { useHeight } from '../../utils/layout';
import DaysViewVerticalLines from '../daysViewTable/daysViewVerticalLines/DaysViewVerticalLines';
import MonthWeekRow from './monthWeekRow/MonthWeekRow';

const renderOneRow = (days: DateTime[]) => {
  const rows: DateTime[][] = getMonthRows(days);

  return rows.map((row: DateTime[], index: number) => {
    return <MonthWeekRow key={row[0].toString()} days={row} index={index} />;
  });
};

const MonthView = (props: MonthViewProps) => {
  const { events } = props;
  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const height: number = useHeight();
  const { width, calendarDays, config } = store;

  const style: any = {
    width,
    height: '100%',
  };

  // const onPageChange = async (isGoingForward?: boolean) => {
  //   await getNewCalendarDays(calendarDays, CALENDAR_VIEW.MONTH, isGoingForward);
  // };

  useEffect(() => {
    if (height !== 0) {
      const monthPositions: any = calculateMonthPositions(
        events,
        width,
        calendarDays,
        config.timezone,
        (height / 6 - 25) / 26 - 1,
        setContext
      );

      setContext('monthLayout', monthPositions);
    }
  }, []);
  useEffect(() => {
    const monthPositions: any = calculateMonthPositions(
      events,
      width,
      calendarDays,
      config.timezone,
      (height / 6 - 25) / 26 - 1,
      setContext
    );

    setContext('monthLayout', monthPositions);
  }, [height]);
  useEffect(() => {
    const monthPositions: any = calculateMonthPositions(
      events,
      width,
      calendarDays,
      config.timezone,
      (height / 6 - 25) / 26 - 1,
      setContext
    );

    setContext('monthLayout', monthPositions);
  }, [calendarDays[0]]);
  useEffect(() => {
    const monthPositions: any = calculateMonthPositions(
      events,
      width,
      calendarDays,
      config.timezone,
      (height / 6 - 25) / 26 - 1,
      setContext
    );

    setContext('monthLayout', monthPositions);
  }, [JSON.stringify(events)]);

  // const days: any = renderOneDay(calendarDays, 'month1', height, events);
  const rows: any = renderOneRow(calendarDays);

  return (
    // <Carousel onPageChange={onPageChange}>
    <div className={'Kalend__MonthView__container'} style={style}>
      <DaysViewVerticalLines />
      {store.monthLayout ? rows : null}
    </div>
    // </Carousel>
  );
};

export default MonthView;
