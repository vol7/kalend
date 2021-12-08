import { HeaderCalendarButtonProps } from './HeaderCalendarButtons.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import HeaderCalendarButtons from './HeaderCalendarButtons';

export default {
  title: 'Components/HeaderCalendarButtons',
  component: HeaderCalendarButtons,
} as Meta;

const Template: Story<HeaderCalendarButtonProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
