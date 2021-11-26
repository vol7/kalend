import React from 'react';
import './DestopLayout.scss';

interface DesktopLayoutProps {
  children: any;
}
const DesktopLayout = (props: DesktopLayoutProps) => {
  const { children } = props;

  return <div className={'DesktopLayout'}>{children}</div>;
};

export default DesktopLayout;
