import { Context } from '../context/store';
import { getHeight, getWidth, useHeight, useWidth } from '../utils/layout';
import { getTableOffset } from '../utils/common';
import { useContext, useEffect } from 'react';

const DimenstionsLayoutLayer = (props: { children: any }) => {
  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };
  const { selectedView } = store;

  const width: any = useWidth();
  const height: any = useHeight();

  // init context
  useEffect(() => {
    setContext('height', height);
    setContext('width', width - getTableOffset(selectedView));

    if (width < 750) {
      setContext('isMobile', true);
    } else {
      setContext('isMobile', false);
    }
  }, []);

  useEffect(() => {
    setContext('width', getWidth() - getTableOffset(selectedView));

    if (width < 750) {
      setContext('isMobile', true);
    } else {
      setContext('isMobile', false);
    }
  }, [width]);
  useEffect(() => {
    setContext('height', getHeight());
  }, [height]);

  // needs to be separate due to inconsistency for month view
  useEffect(() => {
    setContext('height', getHeight());
  }, [selectedView, selectedView]);

  return props.children;
};

export default DimenstionsLayoutLayer;
