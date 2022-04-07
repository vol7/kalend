import { Context } from '../../context/store';
import { DateTime } from 'luxon';
import { useContext } from 'react';

const CurrentHourLine = () => {
  const [store] = useContext(Context);
  const { config, style } = store;

  const currentTime = DateTime.now();

  const wrapperStyle: any = {
    top:
      currentTime.hour * config.hourHeight +
      (currentTime.minute / 60) * config.hourHeight,
  };

  const backgroundStyle: any = {
    background: style.primaryColor,
  };

  return (
    <div style={wrapperStyle} className={'Kalend__CurrentHourLine'}>
      <div
        style={backgroundStyle}
        className={'Kalend__CurrentHourLine__circle'}
      />
      <div
        style={backgroundStyle}
        className={'Kalend__CurrentHourLine__line'}
      />
    </div>
  );
};

export default CurrentHourLine;
