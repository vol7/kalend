import { CALENDAR_VIEW } from '../common/enums';
import { DEFAULT_HOUR_HEIGHT } from '../common/constants';
import { DateTime } from 'luxon';
import { EventLayout } from '../common/interface';
import { createContext, useReducer } from 'react';
import Reducer from './reducer';

interface InitialContext {
  isDark: boolean;
  isLoading: boolean;
  headerEventRowsCount: number;
  initialView: CALENDAR_VIEW | null;
  selectedView: CALENDAR_VIEW | null;
  selectedDate: DateTime;
  hourHeight: number;
  calendarDays: DateTime[];
  width: number;
  height: number;
  isMobile: boolean;
  timezone: string;
  events: any;
  // layouts
  daysViewLayout: EventLayout | null;
  headerLayout: EventLayout | null;
  layoutUpdateSequence: number;
}

const initialContext: InitialContext = {
  isDark: false,
  isLoading: false,
  headerEventRowsCount: 0,
  initialView: null,
  selectedView: null,
  selectedDate: DateTime.now(),
  hourHeight: DEFAULT_HOUR_HEIGHT,
  calendarDays: [],
  width: 0,
  height: 0,
  isMobile: false,
  timezone: '',
  events: {},
  daysViewLayout: null,
  headerLayout: null,
  layoutUpdateSequence: 1,
};

export const Context: any = createContext(initialContext);

const StoreProvider = ({ children }: any) => {
  const [store, dispatch] = useReducer(Reducer, initialContext);

  return (
    <Context.Provider value={[store, dispatch]}>{children}</Context.Provider>
  );
};

export default StoreProvider;
