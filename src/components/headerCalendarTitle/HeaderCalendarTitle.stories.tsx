import { HeaderCalendarTitleProps } from './HeaderCalendarTitle.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import HeaderCalendarTitle from './HeaderCalendarTitle';

export default {
  title: 'Components/HeaderCalendarTitle',
  component: HeaderCalendarTitle,
} as Meta;

const Template: Story<HeaderCalendarTitleProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
