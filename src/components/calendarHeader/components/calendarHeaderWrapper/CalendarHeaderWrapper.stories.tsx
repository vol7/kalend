import { Story, Meta } from '@storybook/react';
import { MissingStory } from '../../../../utils/storybookHelpers';
import CalendarHeaderWrapper from './CalendarHeaderWrapper';
import { CalendarHeaderWrapperProps } from './CalendarHeaderWrapper.props';

export default {
  title: 'Components/CalendarHeader/components/CalendarHeaderWrapper',
  component: CalendarHeaderWrapper,
} as Meta;

const Template: Story<CalendarHeaderWrapperProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
