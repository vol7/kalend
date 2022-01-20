import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import GithubButton from './components/GithubButton';
import { DateTime } from 'luxon';
import Kalend, { CalendarView, OnEventDragFinish } from 'kalend';
import 'kalend/dist/styles/index.css';
import { generateDemoEvents } from './utils/helper';

const CalendComponent = () => {
  const [demoEvents, setDemoEvents] = useState({});

  // Create and load demo events
  useEffect(() => {
    setDemoEvents(generateDemoEvents(DateTime.now(), 80));
  }, []);

  const onNewEventClick = (data: any) => {
    const msg = `New event click action\n\n Callback data:\n\n${JSON.stringify({
      hour: data.hour,
      day: data.day,
      event: 'click event ',
    })}`;
    console.log(msg);
  };

  // Callback for event click
  const onEventClick = (data: any) => {
    const msg = `Click on event action\n\n Callback data:\n\n${JSON.stringify(
      data
    )}`;
    console.log(msg);
  };

  // Callback after dragging is finished
  const onEventDragFinish: OnEventDragFinish = (
    prev: any,
    current: any,
    data: any
  ) => {
    setDemoEvents(data);
  };

  return (
    <div className={'Calendar__wrapper'}>
      <Kalend
        onNewEventClick={onNewEventClick}
        initialView={CalendarView.WEEK}
        disabledViews={[]}
        onEventClick={onEventClick}
        events={demoEvents}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        timezone={'Europe/Berlin'}
        onEventDragFinish={onEventDragFinish}
        // disableMobileDropdown={true}
      />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <div className={'wrapper'}>
      <div className={'container__button'}>
        <GithubButton />
      </div>
      <div className={'container__title'}>
        <h2 className={'title'}>Kalend</h2>
        <h5 className={'subtitle'}>React component with support for events</h5>
      </div>
      <CalendComponent />
      <div style={{ margin: '0 auto', paddingTop: 32 }}>
        <p style={{ color: 'whitesmoke', fontSize: 15 }}>
          {/* eslint-disable-next-line no-undef */}
          Version {process.env.REACT_APP_VERSION}
        </p>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
