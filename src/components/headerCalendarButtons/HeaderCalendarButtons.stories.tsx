import { Story, Meta } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import HeaderCalendarButtons from './HeaderCalendarButtons';
import { HeaderCalendarButtonProps } from './HeaderCalendarButtons.props';

export default {
  title: 'Components/HeaderCalendarButtons',
  component: HeaderCalendarButtons,
} as Meta;

const Template: Story<HeaderCalendarButtonProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
