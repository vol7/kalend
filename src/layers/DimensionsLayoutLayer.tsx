import { Context } from '../context/store';
import { getTableOffset } from '../utils/common';
import { getWidth, useWidth } from '../utils/layout';
import { useContext, useEffect } from 'react';

const DimensionsLayoutLayer = (props: { children: any }) => {
  const [store, dispatch] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatch({ type, payload });
  };
  const { selectedView } = store;

  const width: any = useWidth();

  // init context
  useEffect(() => {
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

  return props.children;
};

export default DimensionsLayoutLayer;
