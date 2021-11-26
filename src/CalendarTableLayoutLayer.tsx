import React, { useEffect, useState } from 'react';

const CalendarTableLayoutLayer = (props: { children: any }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const rootEl: any = document.querySelector('.Calendar__table');

    if (rootEl) {
      setIsMounted(true);
    }
  }, [document.querySelector('.Calendar__table')]);

  return isMounted ? props.children : null;
};

export default CalendarTableLayoutLayer;
