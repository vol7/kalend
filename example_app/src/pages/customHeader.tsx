import GithubButton from '../components/GithubButton';
import React, { useRef, useState } from 'react';
import CalendComponent from '../components/Calendar';
import { OnStateChangeFunc } from '../../../src/common/interface';
import { CALENDAR_VIEW } from 'kalend-layout';
import { DateTime } from 'luxon';

const MainPage = () => {
  const kalendRef: any = useRef();

  const [selectedView, setSelectedView] = useState(CALENDAR_VIEW.MONTH);
  const [selectedDate, setSelectedDate] = useState(
    DateTime.now().toFormat('MM.yyyy')
  );

  const goForward = () => {
    kalendRef?.current?.navigateForward();
  };
  const goBack = () => {
    kalendRef?.current?.navigateBackwards();
  };
  const goToday = () => {
    kalendRef?.current?.navigateToTodayDate();
  };

  const onStateChange: OnStateChangeFunc = (state: any) => {
    setSelectedDate(DateTime.fromISO(state.selectedDate).toFormat('MM.yyyy'));
  };

  return (
    <div className={'wrapper'}>
      <div className={'container__button'}>
        <GithubButton />
      </div>
      <div className={'container__title'}>
        <h2 className={'title'}>Kalend</h2>
        <h5 className={'subtitle'}>React component with support for events</h5>
      </div>
      <div className={'Calendar__wrapper'}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: 40,
            marginBottom: 16,
            alignItems: 'center',
          }}
        >
          <button onClick={goBack}>Back</button>
          <div style={{ width: 6 }} />
          <button onClick={goForward}>Forward</button>
          <div style={{ width: 6 }} />
          <button onClick={goToday}>Today</button>
          <div style={{ width: 8 }} />
          <h5 style={{ fontSize: 16, margin: 0, padding: 0 }}>
            {selectedDate}
          </h5>
          <div style={{ width: 20 }} />
          <button onClick={() => setSelectedView(CALENDAR_VIEW.WEEK)}>
            Week
          </button>
          <div style={{ width: 8 }} />
          <button onClick={() => setSelectedView(CALENDAR_VIEW.MONTH)}>
            Month
          </button>
        </div>
        <CalendComponent
          kalendRef={kalendRef}
          onStateChange={onStateChange}
          selectedView={selectedView}
        />
      </div>
      <div style={{ margin: '0 auto', paddingTop: 32 }}>
        <p style={{ color: 'whitesmoke', fontSize: 15 }}>
          {/* eslint-disable-next-line no-undef */}
          Version {process.env.REACT_APP_VERSION}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <a
            href={'https://github.com/nibdo/calend'}
            target="_blank"
            rel="noreferrer"
          >
            <p
              style={{
                color: 'whitesmoke',
                textDecoration: 'underline',
                fontSize: 15,
                marginTop: 10,
              }}
            >
              Github
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
