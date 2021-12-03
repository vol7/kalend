import React, { createContext, useReducer } from 'react';
import Reducer from './reducer';
import { CALENDAR_VIEW } from '../common/enums';
import { DEFAULT_HOUR_HEIGHT } from '../common/constants';
import { DateTime } from 'luxon';

interface InitialContext {
  isDark: boolean;
  isLoading: boolean;
  headerEventRowsCount: number;
  events: any;
  initialView: CALENDAR_VIEW;
  selectedView: CALENDAR_VIEW;
  selectedDate: any;
  hourHeight: number;
  calendarDays: DateTime[];
  width: number;
  height: number;
  isMobile: boolean;
  timezone: string;
}

const initialContext: InitialContext = {
  isDark: false,
  isLoading: false,
  headerEventRowsCount: 0,
  events: {},
  initialView: CALENDAR_VIEW.WEEK,
  selectedView: CALENDAR_VIEW.WEEK,
  selectedDate: new Date().toISOString(),
  hourHeight: DEFAULT_HOUR_HEIGHT + 40,
  calendarDays: [],
  width: 0,
  height: 0,
  isMobile: false,
  timezone: '',
};

const StoreProvider = ({ children }: any) => {
  const [store, dispatch] = useReducer(Reducer, initialContext);

  return (
    <Context.Provider value={[store, dispatch]}>{children}</Context.Provider>
  );
};

// @ts-ignore
export const Context: any = createContext();
export default StoreProvider;
