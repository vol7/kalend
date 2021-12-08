import { DaysViewTableProps } from './DaysViewTable.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import DaysViewTable from './DaysViewTable';

export default {
  title: 'Components/DaysViewTable',
  component: DaysViewTable,
} as Meta;

const Template: Story<DaysViewTableProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
