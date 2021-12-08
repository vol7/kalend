import { Story, Meta } from '@storybook/react';
import { MissingStory } from '../../../../utils/storybookHelpers';
import CalendarHeaderCol from './CalendarHeaderCol';
import { CalendarHeaderColProps } from './CalendarHeaderCol.props';

export default {
  title: 'Components/CalendarHeader/components/CalendarHeaderCol',
  component: CalendarHeaderCol,
} as Meta;

const Template: Story<CalendarHeaderColProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
