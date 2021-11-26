import React from 'react';
import './MobileLayout.scss';

interface MobileLayoutProps {
  children: any;
  style?: any;
}
const MobileLayout = (props: MobileLayoutProps) => {
  const { children, style } = props;

  return (
    <div className={'MobileLayout'} style={style}>
      {children}
    </div>
  );
};

export default MobileLayout;
