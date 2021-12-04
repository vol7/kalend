import React, { useEffect } from 'react';
import Calendar from './Calendar';
import RootLayoutLayer from './RootLayoutLayer';
import StoreProvider from './context/store';
import {
  CalendarEvent,
  NewEventClickData,
  OnPageChangeData,
} from './common/interface';
import { CALENDAR_VIEW } from './common/enums';
import { validateProps, validateStyle } from './utils/validator';

export interface CalendProps {
  initialDate?: string;
  initialView: CALENDAR_VIEW;
  selectedView?: CALENDAR_VIEW;
  disabledViews?: CALENDAR_VIEW[];
  events: any;
  isDark?: boolean;
  hourHeight?: number;
  onNewEventClick: (data: NewEventClickData) => void;
  onEventClick: (data: CalendarEvent) => void;
  onSelectView?: (view: CALENDAR_VIEW) => void;
  showMoreMonth?: (data: CalendarEvent[]) => void;
  onPageChange?: (data: OnPageChangeData) => void;
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
