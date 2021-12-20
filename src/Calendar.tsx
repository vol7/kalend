import { CALENDAR_VIEW } from './common/enums';
import { CalendarProps } from './Calendar.props';
import { Config } from './common/interface';
import { Context, Store } from './context/store';
import { DateTime } from 'luxon';
import { getCalendarDays } from './utils/calendarDays';
import { getTableOffset } from './utils/common';
import { parseAllDayEvents } from './utils/allDayEvents';
import { useContext, useEffect, useState } from 'react';
import { useWidth } from './utils/layout';
import AgendaView from './components/agendaView/AgendaView';
import CalendarDesktopNavigation from './components/CalendarDesktopNavigation/CalendarDesktopNavigation';
import CalendarHeader from './components/calendarHeader/CalendarHeader';
import CalendarTableLayoutLayer from './layers/CalendarTableLayoutLayer';
import DaysViewTable from './components/daysViewTable/DaysViewTable';
import MonthView from './components/monthView/MonthView';

const Calendar = (props: CalendarProps) => {
  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const {
    selectedDate,
    calendarDays,
    events,
    selectedView,
    callbacks,
    config,
  } = store as Store;
  const { timezone } = config as Config;

  const width: any = useWidth();
  const [prevView, setPrevView] = useState('');
  const [viewChanged, setViewChanged] = useState<any>(null);

  useEffect(() => {
    if (selectedView) {
      const calendarDaysInitial: DateTime[] = getCalendarDays(
        selectedView,
        selectedDate,
        config.weekDayStart
      );

      setContext('calendarDays', calendarDaysInitial);
    }
  }, []);

  // init context
  useEffect(() => {
    // handle timezone and events
    const eventsResult = parseAllDayEvents(props.events, timezone);
    setContext('events', eventsResult);
  }, []);

  useEffect(() => {
    // if (props.selectedView && props.selectedView === selectedView) {
    //   return;
    // }
    if (prevView === viewChanged) {
      return;
    }
    // prevent infinit loop
    if (!selectedView && callbacks.onSelectView) {
      callbacks.onSelectView(viewChanged);
      return;
    }
    if (!viewChanged) {
      return;
    }

    setContext('calendarDays', calendarDays[0]);
    setContext('selectedView', viewChanged);

    // use either passed value or internal state
    const setSelectedDate = (date: DateTime) =>
      setContext('selectedDate', date);

    const calendarDaysNew: DateTime[] = getCalendarDays(
      viewChanged,
      DateTime.now(),
      config.weekDayStart,
      setSelectedDate
    );

    setContext('calendarDays', calendarDaysNew);

    setContext('selectedDate', selectedDate);
    setContext('width', width - getTableOffset(viewChanged));
    setPrevView(viewChanged);
    setViewChanged(null);
  }, [viewChanged]);

  useEffect(() => {
    if (prevView === selectedView) {
      return;
    }
    if (selectedView && selectedView !== selectedView) {
      setContext('calendarDays', calendarDays[0]);
      setContext('selectedView', selectedView);
      setPrevView(selectedView);

      const setSelectedDate = (date: DateTime) =>
        setContext('selectedDate', date);

      const calendarDaysNew: DateTime[] = getCalendarDays(
        selectedView,
        DateTime.now(),
        config.weekDayStart,
        setSelectedDate
      );

      setContext('calendarDays', calendarDaysNew);

      setContext('width', width - getTableOffset(selectedView));
    }
  }, [selectedView]);

  useEffect(() => {
    const result = parseAllDayEvents(props.events, timezone);

    setContext('events', result);
  }, [JSON.stringify(props.events)]);

  useEffect(() => {
    if (
      callbacks.onPageChange &&
      calendarDays &&
      calendarDays[0] &&
      calendarDays.length > 0
    ) {
      callbacks.onPageChange({
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
      <CalendarDesktopNavigation setViewChanged={setViewChanged} />
      {selectedView !== CALENDAR_VIEW.AGENDA ? (
        <CalendarHeader events={events} />
      ) : null}
      <div className={'Kalend__Calendar__table'}>
        <CalendarTableLayoutLayer>
          {selectedView === CALENDAR_VIEW.MONTH ? (
            <MonthView events={events ? events : {}} />
          ) : null}

          {selectedView === CALENDAR_VIEW.DAY ||
          selectedView === CALENDAR_VIEW.THREE_DAYS ||
          selectedView === CALENDAR_VIEW.WEEK ? (
            <DaysViewTable events={events ? events : {}} />
          ) : null}

          {selectedView === CALENDAR_VIEW.AGENDA ? (
            <AgendaView events={events ? events : {}} />
          ) : null}
        </CalendarTableLayoutLayer>
      </div>
    </>
  ) : null;
};

export default Calendar;
