import { AgendaViewProps } from './AgendaView.props';
import { CALENDAR_VIEW } from '../../common/enums';
import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { getSelectedViewType } from '../../utils/common';
import { useContext, useEffect, useState } from 'react';
import AgendaDayRow from './agendaDayRow/AgendaDayRow';
import KalendLayout from 'kalend-layout';
import LuxonHelper, { EVENTS_DAY_FORMAT } from '../../utils/luxonHelper';

const renderAgendaEvents = (events: any, calendarDays: DateTime[]) => {
  let scrollToSet = false;
  return calendarDays.map((calendarDay: DateTime) => {
    const hasEvents = !!events[calendarDay.toFormat(EVENTS_DAY_FORMAT)];
    let scrollToThis = false;
    if (hasEvents) {
      if (!scrollToSet && LuxonHelper.isTodayOrInFuture(calendarDay)) {
        scrollToSet = true;
        scrollToThis = true;
      }
      return (
        <AgendaDayRow
          key={calendarDay.toString()}
          scrollToThis={scrollToThis}
          day={calendarDay}
          events={events[calendarDay.toFormat(EVENTS_DAY_FORMAT)]}
        />
      );
    }
  });
};

const AgendaView = (props: AgendaViewProps) => {
  const { events, eventLayouts } = props;
  const [wasInit, setWasInit] = useState(false);
  const [calendarContent, setCalendarContent] = useState(null);

  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };

  const { calendarDays, width, height } = store;

  const hasExternalLayout = eventLayouts !== undefined;

  useEffect(() => {
    if (!hasExternalLayout) {
      KalendLayout({
        events,
        selectedView: CALENDAR_VIEW.AGENDA,
        height,
        width,
        calendarDays: [],
        config: store.config,
      }).then((res: any) => {
        setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

        const content: any = renderAgendaEvents(res.events, calendarDays);
        setCalendarContent(content);
      });
      setWasInit(true);
    }
  }, [calendarDays[0]]);

  useEffect(() => {
    // don't need to call this immediately
    if (wasInit) {
      if (!hasExternalLayout) {
        KalendLayout({
          events,
          selectedView: CALENDAR_VIEW.AGENDA,
          height,
          width,
          calendarDays: [],
          config: store.config,
        }).then((res: any) => {
          setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

          const content: any = renderAgendaEvents(res.events, calendarDays);
          setCalendarContent(content);
        });
      }
    }
  }, [JSON.stringify(events)]);

  useEffect(() => {
    if (
      hasExternalLayout &&
      getSelectedViewType(props.eventLayouts.selectedView) ===
        CALENDAR_VIEW.AGENDA
    ) {
      setContext('layoutUpdateSequence', store.layoutUpdateSequence + 1);

      const content: any = renderAgendaEvents(
        props.eventLayouts?.events,
        calendarDays
      );
      setCalendarContent(content);
    }
  }, [JSON.stringify(props.eventLayouts)]);

  return (
    <div className={'Kalend__Agenda__container'} style={{ height: '100%' }}>
      {calendarContent}
    </div>
  );
};

export default AgendaView;
