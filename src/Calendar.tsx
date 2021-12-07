import React, { useContext, useEffect, useState } from 'react';

import {
  CalendarEvent,
  Config,
  NewEventClickData,
  OnEventClickFunc,
  OnNewEventClickFunc,
  OnPageChangeFunc,
  OnSelectViewFunc,
  ShowMoreMonthFunc,
} from './common/interface';
import DaysViewTable from './components/daysViewTable/DaysViewTable';
import { getHeight, getWidth, useHeight, useWidth } from './utils/layout';
import { getTableOffset } from './utils/common';
import { DateTime } from 'luxon';
import { getCalendarDays } from './utils/calendarDays';
import { Context } from './context/store';
import CalendarHeader from './components/calendarHeader/CalendarHeader';
import CalendarTableLayoutLayer from './CalendarTableLayoutLayer';
import { CALENDAR_VIEW } from './common/enums';
import MonthView from './components/monthView/MonthView';
import CalendarDesktopNavigation from './components/CalendarDesktopNavigation/CalendarDesktopNavigation';
import { DEFAULT_HOUR_HEIGHT } from './common/constants';
import AgendaView from './components/agendaView/AgendaView';

interface CalendarProps {
  config: Config;
  onNewEventClick: OnNewEventClickFunc;
  onEventClick: OnEventClickFunc;
  disabledViews?: CALENDAR_VIEW[];
  onSelectView?: OnSelectViewFunc;
  selectedView?: CALENDAR_VIEW;
  showMoreMonth?: ShowMoreMonthFunc;
  onPageChange?: OnPageChangeFunc;
  disableMobileDropdown?: boolean;
  timezone?: string;
}
const Calendar = (props: CalendarProps) => {
  const {
    onNewEventClick,
    onEventClick,
    config,
    onSelectView,
    disableMobileDropdown,
    timezone,
  } = props;

  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { selectedView, selectedDate, calendarDays } = store;

  const width: any = useWidth();
  const height: any = useHeight();
  const [prevView, setPrevView] = useState('');
  const [viewChanged, setViewChanged] = useState<any>(null);

  useEffect(() => {
    const calendarDaysInitial: DateTime[] = getCalendarDays(
      props.selectedView || config.initialView,
      config.initialDate ? DateTime.fromISO(config.initialDate) : DateTime.now()
    );

    setContext('calendarDays', calendarDaysInitial);
  }, []);

  // init context
  useEffect(() => {
    setContext('isDark', config.isDark);
    setContext('events', config.events || []);
    setContext(
      'initialView',
      props.selectedView || config.initialView || CALENDAR_VIEW.WEEK
    );
    setContext(
      'selectedView',
      props.selectedView || config.initialView || CALENDAR_VIEW.WEEK
    );
    setContext('selectedDate', config.initialDate || new Date().toISOString());
    setContext('hourHeight', config.hourHeight || DEFAULT_HOUR_HEIGHT);
    setContext('height', height);
    setContext(
      'width',
      width - getTableOffset(props.selectedView || config.initialView)
    );

    if (width < 750) {
      setContext('isMobile', true);
    } else {
      setContext('isMobile', false);
    }

    // handle timezone
    if (timezone) {
      setContext('timezone', timezone);
    } else {
      // set system timezone
      setContext('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
  }, []);

  useEffect(() => {
    if (timezone) {
      setContext('timezone', timezone);
    } else {
      setContext('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
  }, [timezone]);

  useEffect(() => {
    setContext('width', getWidth() - getTableOffset(selectedView));

    if (width < 750) {
      setContext('isMobile', true);
    } else {
      setContext('isMobile', false);
    }
  }, [width]);
  useEffect(() => {
    setContext('height', getHeight());
  }, [height]);

  // needs to be separate due to inconsistency for month view
  useEffect(() => {
    setContext('height', getHeight());
  }, [selectedView, props.selectedView]);

  useEffect(() => {
    // if (props.selectedView && props.selectedView === selectedView) {
    //   return;
    // }
    if (prevView === viewChanged) {
      return;
    }
    // prevent infinit loop
    if (!props.selectedView && onSelectView) {
      onSelectView(viewChanged);
      return;
    }
    if (!viewChanged) {
      return;
    }

    setContext('calendarDays', calendarDays[0]);
    setContext('selectedView', viewChanged);
    // prevent flickering due to
    // change in calendar days length
    // setContext('calendarDays', null);

    // use either passed value or internal state
    const setSelectedDate = (date: any) => setContext('selectedDate', date);

    const calendarDaysNew: DateTime[] = getCalendarDays(
      viewChanged,
      DateTime.now(),
      setSelectedDate
    );

    setContext('calendarDays', calendarDaysNew);

    setContext('isDark', config.isDark);
    setContext('events', config.events);
    setContext('selectedDate', config.initialDate);
    setContext('hourHeight', config.hourHeight);
    setContext('width', width - getTableOffset(viewChanged));
    setPrevView(viewChanged);
    setViewChanged(null);
    // setContext('height', getHeight());
  }, [viewChanged]);

  useEffect(() => {
    if (prevView === props.selectedView) {
      return;
    }
    if (props.selectedView && props.selectedView !== selectedView) {
      setContext('calendarDays', calendarDays[0]);
      setContext('selectedView', props.selectedView);
      setPrevView(props.selectedView);

      const setSelectedDate = (date: any) => setContext('selectedDate', date);

      const calendarDaysNew: DateTime[] = getCalendarDays(
        props.selectedView,
        DateTime.now(),
        setSelectedDate
      );

      setContext('calendarDays', calendarDaysNew);
      // setContext('height', getHeight());
      // setContext('width', width - getTableOffset(selectedView));

      setContext('isDark', config.isDark);
      setContext('events', config.events);
      setContext('selectedDate', config.initialDate);
      setContext('hourHeight', config.hourHeight);
      // setContext('height', getHeight());
      setContext('width', width - getTableOffset(props.selectedView));
    }
  }, [props.selectedView]);

  const handleNewEventClick = (data: NewEventClickData): void => {
    onNewEventClick(data);
  };

  const handleEventClick = (data: CalendarEvent): void => {
    onEventClick(data);
  };

  useEffect(() => {
    setContext('events', config.events);
  }, [JSON.stringify(config.events)]);

  useEffect(() => {
    if (
      props.onPageChange &&
      calendarDays &&
      calendarDays[0] &&
      calendarDays.length > 0
    ) {
      props.onPageChange({
        rangeFrom: calendarDays?.[0]
          ?.set({ hour: 0, minute: 0 })
          .minus({ days: 1 })
          .toUTC()
          .toString(),
        rangeTo: calendarDays?.[calendarDays?.length - 1]
          ?.set({ hour: 23, minute: 59, second: 59 })
          .plus({ days: 2 })
          ?.toUTC()
          .toString(),
      });
    }
  }, [
    selectedView,
    calendarDays?.[0],
    calendarDays?.[calendarDays?.length - 1],
  ]);

  return calendarDays?.length > 0 && selectedDate ? (
    <>
      <CalendarDesktopNavigation
        disabledViews={props.disabledViews}
        setViewChanged={setViewChanged}
        disableMobileDropdown={disableMobileDropdown}
      />
      {selectedView !== CALENDAR_VIEW.AGENDA ? (
        <CalendarHeader handleEventClick={handleEventClick} />
      ) : null}
      <div className={'Calend__Calendar__table'}>
        <CalendarTableLayoutLayer>
          {selectedView === CALENDAR_VIEW.MONTH ? (
            <MonthView
              handleEventClick={handleEventClick}
              showMoreMonth={props.showMoreMonth}
            />
          ) : null}

          {selectedView === CALENDAR_VIEW.DAY ||
          selectedView === CALENDAR_VIEW.THREE_DAYS ||
          selectedView === CALENDAR_VIEW.WEEK ? (
            <DaysViewTable
              handleNewEventClick={handleNewEventClick}
              handleEventClick={handleEventClick}
            />
          ) : null}

          {selectedView === CALENDAR_VIEW.AGENDA ? (
            <AgendaView handleEventClick={handleEventClick} />
          ) : null}
        </CalendarTableLayoutLayer>
      </div>
    </>
  ) : null;
};

export default Calendar;
