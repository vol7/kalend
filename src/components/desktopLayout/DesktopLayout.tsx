import React, { useContext } from 'react';
import { Context } from '../../context/store';

interface DesktopLayoutProps {
  children: any;
}
const DesktopLayout = (props: DesktopLayoutProps) => {
  const { children } = props;
  const [store] = useContext(Context);
  const { isMobile } = store;

  return !isMobile ? (
    <div className={'Calend__DesktopLayout'}>{children}</div>
  ) : null;
};

export default DesktopLayout;
