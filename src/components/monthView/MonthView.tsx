import { Context } from '../../context/store';
import { DateTime } from 'luxon';

import { CALENDAR_VIEW } from '../../common/enums';
import { MonthViewProps } from './MonthView.props';
import { getMonthRows } from './monthWeekRow/MonthWeekRow.utils';
import { getSelectedViewType } from '../../utils/common';
import { useContext, useEffect, useState } from 'react';
import { useHeight } from '../../utils/layout';
import DaysViewVerticalLines from '../daysViewTable/daysViewVerticalLines/DaysViewVerticalLines';
import KalendLayout from 'kalend-layout';
import MonthWeekRow from './monthWeekRow/MonthWeekRow';

const renderOneRow = (days: DateTime[], eventRows: any, sequence: number) => {
  const rows: DateTime[][] = getMonthRows(days);

  return rows.map((row: DateTime[], index: number) => {
    return (
      <MonthWeekRow
        key={row[0].toString() + sequence}
        days={row}
        index={index}
        itemRows={eventRows ? eventRows[index] : []}
        sequence={sequence}
      />
    );
  });
};

const MonthView = (props: MonthViewProps) => {
  const [wasInit, setWasInit] = useState(false);
  const [calendarContent, setCalendarContent] = useState(null);

  const { events } = props;
  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { width, calendarDays } = store;

  const height: number = useHeight();

  const style: any = {
    width,
    height: '100%',
  };

  const hasExternalLayout = props.eventLayouts !== undefined;

  useEffect(() => {
    if (wasInit && height !== 0) {
      if (!hasExternalLayout) {
        KalendLayout({
          events,
          width,
          height,
          calendarDays,
          config: store.config,
          selectedView: CALENDAR_VIEW.MONTH,
        }).then((res: any) => {
          setContext('monthLayout', res.positions);
          setContext('monthOverflowEvents', res.overflowingEvents);
          setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

          const content: any = renderOneRow(
            calendarDays,
            res.positions,
            store.layoutUpdateSequence
          );
          setCalendarContent(content);
        });
      }
    }
  }, [height, width]);

  useEffect(() => {
    if (height !== 0) {
      if (!hasExternalLayout) {
        KalendLayout({
          events,
          width,
          height,
          calendarDays,
          config: store.config,
          selectedView: CALENDAR_VIEW.MONTH,
        }).then((res: any) => {
          setContext('monthLayout', res.positions);
          setContext('monthOverflowEvents', res.overflowingEvents);
          setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);
          const content: any = renderOneRow(
            calendarDays,
            res.positions,
            store.layoutUpdateSequence
          );
          setCalendarContent(content);
        });
      }

      setWasInit(true);
    }
  }, [calendarDays[0], JSON.stringify(events)]);

  useEffect(() => {
    if (
      hasExternalLayout &&
      getSelectedViewType(props.eventLayouts.selectedView) ===
        CALENDAR_VIEW.MONTH
    ) {
      setContext('monthLayout', props.eventLayouts.positions);
      setContext('monthOverflowEvents', props.eventLayouts.overflowingEvents);
      setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

      const content: any = renderOneRow(
        calendarDays,
        props.eventLayouts.positions,
        store.layoutUpdateSequence
      );
      setCalendarContent(content);
    }
  }, [JSON.stringify(props.eventLayouts)]);

  return (
    <div className={'Kalend__MonthView__container'} style={style}>
      <DaysViewVerticalLines />
      {/*{rows}*/}
      {calendarContent}
    </div>
  );
};

export default MonthView;
