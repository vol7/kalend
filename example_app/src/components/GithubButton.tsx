import React from 'react';
// @ts-ignore
import GithubIcon from '../assets/github.svg';

const GithubButton = () => {
  return (
    <a
      href={'https://github.com/nibdo/calend'}
      target="_blank"
      rel="noreferrer"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          background: '#333333',
          cursor: 'pointer',
          borderRadius: 12,
        }}
      >
        <div
          style={{
            width: 20,
            marginRight: 10,
            fill: 'whitesmoke',
          }}
        >
          <img src={GithubIcon} alt={'github-icon'} />
        </div>
        <p
          style={{
            color: 'whitesmoke',
            fontSize: 16,
            marginRight: 4,
            fontWeight: 500,
          }}
        >
          Github
        </p>
      </div>
    </a>
  );
};

export default GithubButton;
