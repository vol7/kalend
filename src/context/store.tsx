import { CALENDAR_VIEW } from '../common/enums';
import { DEFAULT_HOUR_HEIGHT } from '../common/constants';
import { DateTime } from 'luxon';
import { createContext, useReducer } from 'react';
import Reducer from './reducer';

interface InitialContext {
  isDark: boolean;
  isLoading: boolean;
  headerEventRowsCount: number;
  initialView: CALENDAR_VIEW | null;
  selectedView: CALENDAR_VIEW | null;
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
  initialView: null,
  selectedView: null,
  selectedDate: DateTime.now(),
  hourHeight: DEFAULT_HOUR_HEIGHT + 40,
  calendarDays: [],
  width: 0,
  height: 0,
  isMobile: false,
  timezone: '',
};

export const Context: any = createContext(initialContext);

const StoreProvider = ({ children }: any) => {
  const [store, dispatch] = useReducer(Reducer, initialContext);

  return (
    <Context.Provider value={[store, dispatch]}>{children}</Context.Provider>
  );
};

export default StoreProvider;
