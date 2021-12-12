import { CALENDAR_VIEW } from './common/enums';
import { CalendarEvent, NewEventClickData } from './common/interface';
import { CalendarProps } from './Calendar.props';
import { Context } from './context/store';
import { DEFAULT_HOUR_HEIGHT } from './common/constants';
import { DateTime } from 'luxon';
import { getCalendarDays } from './utils/calendarDays';
import { getHeight, getWidth, useHeight, useWidth } from './utils/layout';
import { getTableOffset } from './utils/common';
import { useContext, useEffect, useState } from 'react';
import AgendaView from './components/agendaView/AgendaView';
import CalendarDesktopNavigation from './components/CalendarDesktopNavigation/CalendarDesktopNavigation';
import CalendarHeader from './components/calendarHeader/CalendarHeader';
import CalendarTableLayoutLayer from './CalendarTableLayoutLayer';
import DaysViewTable from './components/daysViewTable/DaysViewTable';
import MonthView from './components/monthView/MonthView';

const Calendar = (props: CalendarProps) => {
  const {
    onNewEventClick,
    onEventClick,
    onEventDragFinish,
    config,
    onSelectView,
    disableMobileDropdown,
    timezone,
  } = props;
  // const { events } = config;

  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { selectedView, selectedDate, calendarDays, events } = store;

  const width: any = useWidth();
  const height: any = useHeight();
  const [prevView, setPrevView] = useState('');
  const [viewChanged, setViewChanged] = useState<any>(null);

  useEffect(() => {
    const calendarDaysInitial: DateTime[] = getCalendarDays(
      props.selectedView || config.initialView,
      config.initialDate ? config.initialDate : DateTime.now()
    );

    setContext('calendarDays', calendarDaysInitial);
  }, []);

  // init context
  useEffect(() => {
    setContext('events', config.events);
    setContext('isDark', config.isDark);
    setContext(
      'initialView',
      props.selectedView || config.initialView || CALENDAR_VIEW.WEEK
    );
    setContext(
      'selectedView',
      props.selectedView || config.initialView || CALENDAR_VIEW.WEEK
    );
    setContext('selectedDate', config.initialDate || DateTime.now());
    setContext('hourHeight', config.hourHeight || DEFAULT_HOUR_HEIGHT);
    setContext('height', height);
    setContext(
      'width',
      width -
        getTableOffset(config.initialView || props.selectedView || selectedView)
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
    setContext(
      'width',
      getWidth() -
        getTableOffset(selectedView || props.selectedView || config.initialView)
    );

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
    const setSelectedDate = (date: DateTime) =>
      setContext('selectedDate', date);

    const calendarDaysNew: DateTime[] = getCalendarDays(
      viewChanged,
      DateTime.now(),
      setSelectedDate
    );

    setContext('calendarDays', calendarDaysNew);

    setContext('isDark', config.isDark);
    setContext('selectedDate', config.initialDate || DateTime.now());
    setContext('hourHeight', config.hourHeight);
    setContext('width', width - getTableOffset(viewChanged));
    setPrevView(viewChanged);
    setViewChanged(null);
  }, [viewChanged]);

  useEffect(() => {
    if (prevView === props.selectedView) {
      return;
    }
    if (props.selectedView && props.selectedView !== selectedView) {
      setContext('calendarDays', calendarDays[0]);
      setContext('selectedView', props.selectedView);
      setPrevView(props.selectedView);

      const setSelectedDate = (date: DateTime) =>
        setContext('selectedDate', date);

      const calendarDaysNew: DateTime[] = getCalendarDays(
        props.selectedView,
        DateTime.now(),
        setSelectedDate
      );

      setContext('calendarDays', calendarDaysNew);

      setContext('isDark', config.isDark);
      setContext('selectedDate', config.initialDate || DateTime.now());
      setContext('hourHeight', config.hourHeight);
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

  return selectedView && calendarDays?.length > 0 && selectedDate ? (
    <>
      <CalendarDesktopNavigation
        disabledViews={props.disabledViews}
        setViewChanged={setViewChanged}
        disableMobileDropdown={disableMobileDropdown}
      />
      {selectedView !== CALENDAR_VIEW.AGENDA ? (
        <CalendarHeader
          handleEventClick={handleEventClick}
          events={events}
          onEventDragFinish={onEventDragFinish}
        />
      ) : null}
      <div className={'Calend__Calendar__table'}>
        <CalendarTableLayoutLayer>
          {selectedView === CALENDAR_VIEW.MONTH ? (
            <MonthView
              handleEventClick={handleEventClick}
              showMoreMonth={props.showMoreMonth}
              events={events ? events : {}}
            />
          ) : null}

          {selectedView === CALENDAR_VIEW.DAY ||
          selectedView === CALENDAR_VIEW.THREE_DAYS ||
          selectedView === CALENDAR_VIEW.WEEK ? (
            <DaysViewTable
              handleNewEventClick={handleNewEventClick}
              handleEventClick={handleEventClick}
              onEventDragFinish={onEventDragFinish}
              events={events ? events : {}}
            />
          ) : null}

          {selectedView === CALENDAR_VIEW.AGENDA ? (
            <AgendaView
              handleEventClick={handleEventClick}
              events={events ? events : {}}
            />
          ) : null}
        </CalendarTableLayoutLayer>
      </div>
    </>
  ) : null;
};

export default Calendar;
