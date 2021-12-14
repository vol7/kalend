import { useEffect, useState } from 'react';

export const getWidth = () => {
  const rootEl: any = document.querySelector('.Kalend__Calendar__root');
  if (rootEl) {
    return rootEl.clientWidth;
  }

  return 0;
};

export const useWidth = () => {
  const [width, setWidth] = useState(getWidth());

  // Get width on init
  useEffect(() => {
    const listenToResizeEvent = () => {
      setWidth(getWidth());
    };

    window.addEventListener('resize', listenToResizeEvent);

    return () => {
      window.removeEventListener('resize', listenToResizeEvent);
    };
  }, []);

  return width;
};

export const getDayLayoutWidth = () => {
  const rootEl: any = document.querySelector('.Kalend__Calendar__body');
  if (rootEl) {
    return rootEl.clientWidth;
  }

  return 0;
};

export const useDayLayoutWidth = () => {
  const [width, setWidth] = useState(getDayLayoutWidth());

  // Get width on init
  useEffect(() => {
    const listenToResizeEvent = () => {
      setWidth(getDayLayoutWidth());
    };

    window.addEventListener('resize', listenToResizeEvent);

    return () => {
      window.removeEventListener('resize', listenToResizeEvent);
    };
  }, []);

  return width;
};

export const getHeight = () => {
  const rootEl: any = document.querySelector('.Kalend__Calendar__table');
  if (rootEl) {
    return rootEl.clientHeight;
  }

  return 0;
};

/**
 * Get height on resize
 */
export const useHeight = () => {
  const [height, setHeight] = useState(getHeight());

  // Get height on init
  useEffect(() => {
    getHeight();
  }, []);

  useEffect(() => {
    const listenToResizeEvent = () => {
      setHeight(getHeight());
    };

    window.addEventListener('resize', listenToResizeEvent);

    return () => {
      window.removeEventListener('resize', listenToResizeEvent);
    };
  }, []);

  return height;
};
