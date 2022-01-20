import { Context, Store } from '../context/store';
import { KalendState } from '../common/interface';
import { getRange } from '../utils/calendarDays';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';

const CalendarTableLayoutLayer = (props: { children: any }) => {
  const [store] = useContext(Context);

  const { calendarDays, selectedView, callbacks, config, width, direction } =
    store as Store;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const rootEl: any = document.querySelector('.Kalend__Calendar__table');

    if (rootEl) {
      setIsMounted(true);
    }
  }, [document.querySelector('.Kalend__Calendar__table')]);

  // Expose basic state to outside
  useLayoutEffect(() => {
    if (callbacks.onStateChange && isMounted) {
      const data: KalendState = {
        selectedView,
        calendarDays,
        range: { ...getRange(calendarDays), direction },
        width,
        config,
        isMobile: store.isMobile,
        height: store.height,
      };
      callbacks.onStateChange(data);
    }
  }, [
    selectedView,
    JSON.stringify(calendarDays),
    width,
    JSON.stringify(config),
    store.isMobile,
    isMounted,
    direction,
  ]);

  useEffect(() => {
    if (callbacks.onStateChange && isMounted) {
      const data: KalendState = {
        selectedView,
        calendarDays,
        range: { ...getRange(calendarDays), direction },
        width,
        config,
        isMobile: store.isMobile,
        height: store.height,
      };
      callbacks.onStateChange(data);
    }
  }, []);

  return isMounted ? props.children : null;
};

export default CalendarTableLayoutLayer;
