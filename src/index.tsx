import './i18n';
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
import { useEffect } from 'react';
import { validateProps, validateStyle } from './utils/validator';
import Calendar from './Calendar';
import ConfigLayer from './layers/ConfigLayer';
import DimensionsLayoutLayer from './layers/DimensionsLayoutLayer';
import RootLayoutLayer from './layers/RootLayoutLayer';
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
  initialView?: CALENDAR_VIEW;
  selectedView?: CALENDAR_VIEW;
  disabledViews?: CALENDAR_VIEW[];
  events?: any;
  isDark?: boolean;
  hourHeight?: number;
  onNewEventClick?: OnNewEventClickFunc;
  onEventClick?: OnEventClickFunc;
  onSelectView?: OnSelectViewFunc;
  showMoreMonth?: ShowMoreMonthFunc;
  onPageChange?: OnPageChangeFunc;
  onEventDragFinish?: OnEventDragFinishFunc;
  disableMobileDropdown?: boolean;
  timezone?: string;
  weekDayStart?: string;
  timeFormat?: string;
  calendarIDsHidden?: string[];
  children?: any;
  language?: string;
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
          <ConfigLayer {...props}>
            <DimensionsLayoutLayer>
              <Calendar events={props.events} />
            </DimensionsLayoutLayer>
          </ConfigLayer>
        </RootLayoutLayer>
      </StoreProvider>
    </div>
  );
};

export default Kalend;
