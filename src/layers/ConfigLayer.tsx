import { CALENDAR_VIEW, TIME_FORMAT, WEEKDAY_START } from '../common/enums';
import { Callbacks, Config } from '../common/interface';
import { Context } from '../context/store';
import { DEFAULT_HOUR_HEIGHT } from '../common/constants';
import { DateTime } from 'luxon';
import { KalendProps } from '../index';
import { filterEventsByCalendarIDs } from '../utils/eventLayout';
import { useContext, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};

const parseTimeFormat = (
  timeFormatValue: string | undefined
): TIME_FORMAT | void => {
  if (timeFormatValue) {
    if (
      timeFormatValue.toLowerCase() ===
      TIME_FORMAT.H_24.toString().toLowerCase()
    ) {
      return TIME_FORMAT.H_24;
    } else if (
      timeFormatValue.toLowerCase() ===
      TIME_FORMAT.H_12.toString().toLowerCase()
    ) {
      return TIME_FORMAT.H_12;
    }
  }
};

const parseWeekDayStart = (
  weekDayStartValue: string | undefined
): WEEKDAY_START | void => {
  if (weekDayStartValue) {
    if (
      weekDayStartValue.toLowerCase() === WEEKDAY_START.MONDAY.toLowerCase()
    ) {
      return WEEKDAY_START.MONDAY;
    } else if (
      weekDayStartValue.toLowerCase() === WEEKDAY_START.SUNDAY.toLowerCase()
    ) {
      return WEEKDAY_START.SUNDAY;
    }
  }
};

export const createConfig = (props: KalendProps): Config => {
  return {
    hourHeight: props.hourHeight || DEFAULT_HOUR_HEIGHT,
    timeFormat: parseTimeFormat(props.timeFormat) || TIME_FORMAT.H_24,
    timezone:
      props.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    weekDayStart: parseWeekDayStart(props.weekDayStart) || WEEKDAY_START.MONDAY,
    isDark: false, //props.isDark,
    disableMobileDropdown: props.disableMobileDropdown || false,
    disabledViews: props.disabledViews,
    calendarIDsHidden: props.calendarIDsHidden || null,
    hasExternalLayout: props.eventLayouts !== undefined,
    focusHour: props.focusHour || null,
    showTimeLine: props.showTimeLine || false,
  };
};

export const createCallbacks = (props: KalendProps): Callbacks => {
  return {
    onEventDragFinish: props.onEventDragFinish || undefined,
    onPageChange: props.onPageChange || undefined,
    onSelectView: props.onSelectView || undefined,
    onEventClick: props.onEventClick || emptyFunction,
    onNewEventClick: props.onNewEventClick || emptyFunction,
    showMoreMonth: props.showMoreMonth || emptyFunction,
    onStateChange: props.onStateChange || undefined,
  };
};

const ConfigLayer = (props: KalendProps) => {
  const [isReady, setIsReady] = useState(false);

  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const initFromProps = () => {
    const config = createConfig(props);
    const callbacks = createCallbacks(props);
    setContext('config', config);
    setContext('callbacks', callbacks);
    setContext(
      'selectedView',
      props.selectedView || props.initialView || CALENDAR_VIEW.WEEK
    );
    setContext(
      'selectedDate',
      props.initialDate ? DateTime.fromISO(props.initialDate) : DateTime.now()
    );

    setContext('isNewEventOpen', true);
    if (props.style) {
      setContext('style', props.style);
    }

    if (props.draggingDisabledConditions) {
      setContext(
        'draggingDisabledConditions',
        props.draggingDisabledConditions
      );
    }

    setIsReady(true);
  };
  useEffect(() => {
    initFromProps();
    setIsReady(true);
  }, []);

  useEffect(() => {
    setContext('isNewEventOpen', props.isNewEventOpen);
  }, [props.isNewEventOpen]);

  useEffect(() => {
    initFromProps();
  }, [
    props.timeFormat,
    props.timezone,
    // props.disabledViews, // keeps re-rendering without any change
    props.isDark,
    props.disableMobileDropdown,
  ]);

  useEffect(() => {
    const newConfig = { ...store.config };

    newConfig.hourHeight = props.hourHeight;

    setContext('config', newConfig);
  }, [props.hourHeight]);

  useEffect(() => {
    const eventsFiltered: any = filterEventsByCalendarIDs(
      props.events,
      props.calendarIDsHidden
    );

    setContext('events', eventsFiltered);
  }, [
    JSON.stringify(props.calendarIDsHidden),
    props.calendarIDsHidden?.length,
  ]);

  return isReady ? props.children : null;
};

export default ConfigLayer;
