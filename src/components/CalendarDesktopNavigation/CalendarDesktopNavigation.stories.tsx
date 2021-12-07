import { Story, Meta } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import CalendarDesktopNavigation from './CalendarDesktopNavigation';
import { CalendarDesktopNavigationProps } from './CalendarDesktopNavigation.props';

export default {
  title: 'Components/CalendarDesktopNavigation',
  component: CalendarDesktopNavigation,
} as Meta;

const Template: Story<CalendarDesktopNavigationProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
