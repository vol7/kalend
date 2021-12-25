import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../../utils/storybookHelpers';
import { MonthWeekRowProps } from './MonthWeekRow.props';
import MonthWeekRow from './MonthWeekRow';

export default {
  title: 'Components/MonthWeekRow',
  component: MonthWeekRow,
} as Meta;

const Template: Story<MonthWeekRowProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
