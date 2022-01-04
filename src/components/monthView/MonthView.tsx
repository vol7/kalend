import { Context } from '../../context/store';
import { DateTime } from 'luxon';

import { MonthViewProps } from './MonthView.props';
import {
  calculateMonthPositions,
  getMonthRows,
} from './monthWeekRow/MonthWeekRow.utils';
import { useContext, useEffect, useState } from 'react';
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
  const [wasInit, setWasInit] = useState(false);

  const { events } = props;
  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { width, calendarDays, config, callbacks } = store;
  const height: any = useHeight();

  const style: any = {
    width,
    height: '100%',
  };

  const hasWorker = callbacks.onWorkerAction;

  const cleanStateForWorker = () => {
    setContext('monthLayout', {});
    setContext('monthOverflowEvents', []);
  };

  useEffect(() => {
    if (height !== 0 && !wasInit) {
      if (hasWorker) {
        cleanStateForWorker();
        callbacks.onWorkerAction({
          calendarDays,
          type: 'MONTH',
          events,
          width,
          config,
          maxEventsVisible: (height / 6 - 25) / 26 - 1,
        });
      } else {
        const monthPositions: any = calculateMonthPositions(
          events,
          width,
          calendarDays,
          config,
          (height / 6 - 25) / 26 - 1,
          setContext
        );

        setContext('monthLayout', monthPositions.result);
        setContext('monthOverflowEvents', monthPositions.overflowingEvents);
      }

      setWasInit(true);
    }
  }, [height]);

  useEffect(() => {
    if (height !== 0) {
      if (hasWorker) {
        cleanStateForWorker();
        callbacks.onWorkerAction({
          calendarDays,
          type: 'MONTH',
          events,
          width,
          config,
          maxEventsVisible: (height / 6 - 25) / 26 - 1,
        });
      } else {
        const monthPositions: any = calculateMonthPositions(
          events,
          width,
          calendarDays,
          config,
          (height / 6 - 25) / 26 - 1,
          setContext
        );

        setContext('monthLayout', monthPositions.result);
        setContext('monthOverflowEvents', monthPositions.overflowingEvents);
      }

      setWasInit(true);
    }
  }, [calendarDays[0]]);

  useEffect(() => {
    // don't need to call this immediately
    if (wasInit) {
      if (hasWorker) {
        // cleanStateForWorker(); // Dont' clean because it reset state
        // after dragging
        callbacks.onWorkerAction({
          calendarDays,
          type: 'MONTH',
          events,
          width,
          config,
          maxEventsVisible: (height / 6 - 25) / 26 - 1,
        });
      } else {
        const monthPositions: any = calculateMonthPositions(
          events,
          width,
          calendarDays,
          config,
          (height / 6 - 25) / 26 - 1,
          setContext
        );

        setContext('monthLayout', monthPositions.result);
        setContext('monthOverflowEvents', monthPositions.overflowingEvents);
      }
    }
  }, [JSON.stringify(events)]);

  useEffect(() => {
    if (hasWorker && props.eventLayouts?.type === 'monthPositions') {
      setContext('monthLayout', props.eventLayouts.result);
      setContext('monthOverflowEvents', props.eventLayouts.overflowingEvents);
    }
  }, [JSON.stringify(props.eventLayouts)]);

  const rows: any = renderOneRow(calendarDays);

  return (
    <div className={'Kalend__MonthView__container'} style={style}>
      <DaysViewVerticalLines />
      {rows}
    </div>
  );
};

export default MonthView;
