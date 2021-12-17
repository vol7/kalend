import { CALENDAR_VIEW } from './common/enums';
import {
  CalendarEvent,
  NewEventClickData,
  OnEventClickFunc,
  OnEventDragFinishFunc,
  OnNewEventClickFunc,
  OnPageChangeFunc,
  OnSelectViewFunc,
  PageChangeData,
  ShowMoreMonthFunc,
} from './common/interface';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { validateProps, validateStyle } from './utils/validator';
import Calendar from './Calendar';
import RootLayoutLayer from './RootLayoutLayer';
import StoreProvider from './context/store';

export const CalendarView = CALENDAR_VIEW;
export type { CalendarEvent };
export type OnEventClickData = CalendarEvent;
export type OnNewEventClickData = NewEventClickData;
export type OnPageChangeData = PageChangeData;
export type OnSelectViewData = CALENDAR_VIEW;
export type ShowMoreMonthData = CalendarEvent[];
export type OnEventDragFinish = OnEventDragFinishFunc;

export interface KalendProps {
  initialDate?: string;
  initialView: CALENDAR_VIEW;
  selectedView?: CALENDAR_VIEW;
  disabledViews?: CALENDAR_VIEW[];
  events: any;
  isDark?: boolean;
  hourHeight?: number;
  onNewEventClick: OnNewEventClickFunc;
  onEventClick: OnEventClickFunc;
  onSelectView?: OnSelectViewFunc;
  showMoreMonth?: ShowMoreMonthFunc;
  onPageChange?: OnPageChangeFunc;
  onEventDragFinish?: OnEventDragFinishFunc;
  disableMobileDropdown?: boolean;
  timezone?: string;
  weekDayStart?: string;
}
const Kalend = (props: KalendProps) => {
  // basic validation
  useEffect(() => {
    validateProps(props);
    validateStyle();
  }, []);

  return (
    <div className={'Kalend__Calendar__root Kalend__main'}>
      <StoreProvider>
        <RootLayoutLayer>
          <Calendar
            config={{
              initialDate: props.initialDate
                ? DateTime.fromISO(props.initialDate)
                : DateTime.now(),
              initialView: props.initialView,
              hourHeight: props.hourHeight,
              isDark: props.isDark,
              events: props.events,
            }}
            weekDayStart={props.weekDayStart}
            onEventClick={props.onEventClick}
            onNewEventClick={props.onNewEventClick}
            disabledViews={props.disabledViews}
            onSelectView={props.onSelectView}
            selectedView={props.selectedView}
            showMoreMonth={props.showMoreMonth}
            onPageChange={props.onPageChange}
            disableMobileDropdown={props.disableMobileDropdown}
            onEventDragFinish={props.onEventDragFinish}
            timezone={props.timezone}
          />
        </RootLayoutLayer>
      </StoreProvider>
    </div>
  );
};

export default Kalend;
