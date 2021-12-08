import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import { MobileLayoutProps } from './MobileLayout.props';
import MobileLayout from './MobileLayout';

export default {
  title: 'Components/MobileLayout',
  component: MobileLayout,
} as Meta;

const Template: Story<MobileLayoutProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
