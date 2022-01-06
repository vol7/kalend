import { CALENDAR_VIEW } from './common/enums';
import { CalendarProps } from './Calendar.props';
import { Context, Store } from './context/store';
import { DateTime } from 'luxon';
import { getCalendarDays, getRange } from './utils/calendarDays';
import { getTableOffset } from './utils/common';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
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

  const { selectedDate, calendarDays, selectedView, callbacks, config } =
    store as Store;

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

  // // init context
  // useEffect(() => {
  //   // handle timezone and events
  //   const eventsResult = parseAllDayEvents(props.events, timezone);
  //   setContext('events', eventsResult);
  // }, []);

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

  useLayoutEffect(() => {
    setContext('events', props.events);
  }, [JSON.stringify(props.events)]);

  useLayoutEffect(() => {
    if (
      callbacks.onPageChange &&
      calendarDays &&
      calendarDays[0] &&
      calendarDays.length > 0
    ) {
      callbacks.onPageChange({
        ...getRange(calendarDays),
        direction: store.direction,
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
      {selectedView !== CALENDAR_VIEW.AGENDA ? <CalendarHeader /> : null}
      <div className={'Kalend__Calendar__table'}>
        <CalendarTableLayoutLayer>
          {selectedView === CALENDAR_VIEW.MONTH ? (
            <MonthView
              events={props.events ? props.events : []}
              eventLayouts={props.eventLayouts}
            />
          ) : null}

          {selectedView === CALENDAR_VIEW.DAY ||
          selectedView === CALENDAR_VIEW.THREE_DAYS ||
          selectedView === CALENDAR_VIEW.WEEK ? (
            <DaysViewTable
              events={props.events ? props.events : []}
              eventLayouts={props.eventLayouts}
            />
          ) : null}

          {selectedView === CALENDAR_VIEW.AGENDA ? (
            <AgendaView
              events={props.events ? props.events : []}
              eventLayouts={props.eventLayouts}
            />
          ) : null}
        </CalendarTableLayoutLayer>
      </div>
    </>
  ) : null;
};

export default Calendar;
