import { Story, Meta } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import CalendarHeader from './CalendarHeader';
import { CalendarHeaderProps } from './CalendarHeader.props';

export default {
  title: 'Components/CalendarHeader/CalendarHeader',
  component: CalendarHeader,
} as Meta;

const Template: Story<CalendarHeaderProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
