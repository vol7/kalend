import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../../utils/storybookHelpers';
import ShowMoreModal from './ShowMoreModal';

export default {
  title: 'Components/ShowMoreModal',
  component: ShowMoreModal,
} as Meta;

const Template: Story = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
