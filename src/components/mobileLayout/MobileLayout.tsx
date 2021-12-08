import { useContext } from 'react';
import { Context } from '../../context/store';
import { MobileLayoutProps } from './MobileLayout.props';

const MobileLayout = (props: MobileLayoutProps) => {
  const { children, style } = props;
  const [store] = useContext(Context);
  const { isMobile } = store;

  return isMobile ? (
    <div className={'Calend__MobileLayout'} style={style}>
      {children}
    </div>
  ) : null;
};

export default MobileLayout;
