import GithubButton from '../components/GithubButton';
import React from 'react';
import CalendComponent from '../components/Calendar';

const MainPage = () => {
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
        <CalendComponent isDark={false} />
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
