import { Story, Meta } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import DaysViewTable from './DaysViewTable';
import { DaysViewTableProps } from './DaysViewTable.props';

export default {
  title: 'Components/DaysViewTable',
  component: DaysViewTable,
} as Meta;

const Template: Story<DaysViewTableProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
