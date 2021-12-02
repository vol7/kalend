import React, { useContext } from 'react';
import { Context } from '../../context/store';

interface MobileLayoutProps {
  children: any;
  style?: any;
}
const MobileLayout = (props: MobileLayoutProps) => {
  const { children, style } = props;
  const [store] = useContext(Context);
  const { isMobile } = store;

  return isMobile ? (
    <div className={'MobileLayout'} style={style}>
      {children}
    </div>
  ) : null;
};

export default MobileLayout;
