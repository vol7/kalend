import { CALENDAR_OFFSET_LEFT } from '../../common/constants';
import { CALENDAR_VIEW } from '../../common/enums';
import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { DaysViewTableProps } from './DaysViewTable.props';
import { NormalEventPosition } from '../../common/interface';
import { calculateDaysViewLayout } from '../../utils/eventLayout';
import { calculatePositionForHeaderEvents } from '../calendarHeader/calendarHeaderEvents/CalendarHeaderEvents.utils';
import { formatDateTimeToString, getCorrectWidth } from '../../utils/common';
import { useContext, useEffect, useState } from 'react';
import CalendarBodyHours from './daysViewOneDay/calendarBodyHours/CalendarBodyHours';
import DaysViewOneDay from './daysViewOneDay/DaysViewOneDay';
import DaysViewVerticalLines from './daysViewVerticalLines/DaysViewVerticalLines';

const renderOneDay = (calendarDays: DateTime[], events: any) => {
  return calendarDays.map((calendarDay: DateTime, index: number) => {
    const formattedDayString: string = formatDateTimeToString(calendarDay);

    return (
      <DaysViewOneDay
        key={calendarDay.toString()}
        day={calendarDay}
        index={index}
        data={events ? events[formattedDayString] : []}
      />
    );
  });
};

const DaysViewTable = (props: DaysViewTableProps) => {
  const { events } = props;

  const [wasInit, setWasInit] = useState(false);

  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const cleanStateForWorker = () => {
    setContext('headerLayout', {});
    setContext('daysViewLayout', []);
  };

  const {
    isMobile,
    calendarDays,
    width,
    height,
    selectedView,
    config,
    callbacks,
  } = store;

  const days: any = renderOneDay(calendarDays, events);

  const style: any = {
    paddingLeft: CALENDAR_OFFSET_LEFT,
    // width: '100%',
    height,
  };

  // const adjustScrollPosition = () => {
  //   const currentElement: any = document.getElementById(`Kalend__timetable`);
  //
  //   (currentElement.scrollTop = DateTime.now().hour * config.hourHeight) -
  //     config.hourHeight;
  // };
  //
  // useEffect(() => {
  //   adjustScrollPosition();
  // }, []);

  // const onPageChange = async (isGoingForward?: boolean) => {
  //   await getNewCalendarDays(calendarDays, selectedView, isGoingForward);
  // };

  const hasWorker = callbacks.onWorkerAction;

  // recalculate event positions on calendarDays change
  useEffect(() => {
    if (wasInit) {
      if (hasWorker) {
        cleanStateForWorker();
        callbacks.onWorkerAction({
          selectedView,
          calendarDays,
          type: 'DAYS',
          events,
          width,
          config,
          isMobile,
        });
      } else {
        const positions: any = calculateDaysViewLayout(
          calendarDays,
          events,
          getCorrectWidth(width, isMobile, CALENDAR_VIEW.WEEK),
          config,
          selectedView
        );

        setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

        setContext('daysViewLayout', positions);
      }
    }
  }, [calendarDays[0]]);

  useEffect(() => {
    if (wasInit) {
      if (hasWorker) {
        callbacks.onWorkerAction({
          selectedView,
          calendarDays,
          type: 'DAYS',
          events,
          width,
          config,
          isMobile,
        });
      } else {
        const positions: any = calculateDaysViewLayout(
          calendarDays,
          events,
          getCorrectWidth(width, isMobile, CALENDAR_VIEW.WEEK),
          config,
          selectedView
        );

        setContext('daysViewLayout', positions);
        // recalculate positions
        const eventPositions: NormalEventPosition[][] =
          calculatePositionForHeaderEvents(
            events,
            getCorrectWidth(width, isMobile, CALENDAR_VIEW.WEEK) /
              calendarDays.length,
            calendarDays,
            config.timezone,
            setContext
          );
        setContext('headerLayout', eventPositions);

        // setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);
      }
    }
  }, [JSON.stringify(events)]);

  useEffect(() => {
    if (hasWorker) {
      cleanStateForWorker();
      callbacks.onWorkerAction({
        selectedView,
        calendarDays,
        type: 'DAYS',
        events,
        width,
        config,
        isMobile,
      });
    } else {
      const positions: any = calculateDaysViewLayout(
        calendarDays,
        events,
        getCorrectWidth(width, isMobile, CALENDAR_VIEW.WEEK),
        config,
        selectedView
      );

      setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

      setContext('daysViewLayout', positions);
    }
    setWasInit(true);
  }, []);

  useEffect(() => {
    if (hasWorker && props.eventLayouts?.type === 'daysPositions') {
      setContext('headerLayout', props.eventLayouts.headerPositions);
      setContext(
        'headerEventRowsCount',
        props.eventLayouts.headerEventRowsCount
      );
      setContext('daysViewLayout', props.eventLayouts.normalPositions);
    }
  }, [JSON.stringify(props.eventLayouts)]);

  return (
    // <Carousel onPageChange={onPageChange}>
    <div
      style={style}
      className={'Kalend__CalendarBody'}
      id={`Kalend__timetable`}
      // onScroll={handleScroll}
    >
      <CalendarBodyHours />
      <DaysViewVerticalLines />
      {days}
    </div>
    // </Carousel>
  );
};

export default DaysViewTable;
