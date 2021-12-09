import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import { MonthViewProps } from './MonthView.props';
import MonthView from './MonthView';

export default {
  title: 'Components/MonthView',
  component: MonthView,
} as Meta;

const Template: Story<MonthViewProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
