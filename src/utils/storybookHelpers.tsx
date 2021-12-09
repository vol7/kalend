import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

/** This component is used to display the Missing Component message */
export const MissingStory: StoryFnReactReturnType = (
  <>
    <span
      style={{
        background: 'lightgrey',
        borderRadius: '25px',
        padding: '10px',
        marginTop: '10px',
      }}
    >
      {"This component doesn't render in Storybook yet"}
    </span>
  </>
);
