import { Context } from '../../context/store';
import { DayOfWeekTextProps } from './DayOfWeekText.props';
import { useContext } from 'react';

const DayOfWeekText = (props: DayOfWeekTextProps) => {
  const { width, day } = props;

  const [store] = useContext(Context);

  const { translations } = store;

  return (
    <div className={'Kalend__CalendarHeaderWeekDays__col'} style={{ width }}>
      <p className={'Kalend__text Kalend__CalendarHeaderWeekDays__text'}>
        {translations['weekDays'][`${day.toFormat('EEE')}`]}
      </p>
    </div>
  );
};

export default DayOfWeekText;
