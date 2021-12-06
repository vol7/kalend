import React, { useEffect } from 'react';
import Calendar from './Calendar';
import RootLayoutLayer from './RootLayoutLayer';
import StoreProvider from './context/store';
import {
  OnEventClickFunc,
  OnNewEventClickFunc,
  OnPageChangeFunc,
  OnSelectViewFunc,
  ShowMoreMonthFunc,
} from './common/interface';
import { CALENDAR_VIEW } from './common/enums';
import { validateProps, validateStyle } from './utils/validator';
import './index.scss';

export const CalendarView = CALENDAR_VIEW;

export interface CalendProps {
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
  disableMobileDropdown?: boolean;
  timezone?: string;
}
const Calend = (props: CalendProps) => {
  // basic validation
  useEffect(() => {
    validateProps(props);
    validateStyle();
  }, []);

  return (
    <div className={'Calend__Calendar__root Calend__main'}>
      <StoreProvider>
        <RootLayoutLayer>
          <Calendar
            config={{
              initialDate: props.initialDate,
              initialView: props.initialView,
              hourHeight: props.hourHeight,
              isDark: props.isDark,
              events: props.events,
            }}
            onEventClick={props.onEventClick}
            onNewEventClick={props.onNewEventClick}
            disabledViews={props.disabledViews}
            onSelectView={props.onSelectView}
            selectedView={props.selectedView}
            showMoreMonth={props.showMoreMonth}
            onPageChange={props.onPageChange}
            disableMobileDropdown={props.disableMobileDropdown}
            timezone={props.timezone}
          />
        </RootLayoutLayer>
      </StoreProvider>
    </div>
  );
};

export default Calend;
