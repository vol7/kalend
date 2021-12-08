import { Story, Meta } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import MobileLayout from './MobileLayout';
import { MobileLayoutProps } from './MobileLayout.props';

export default {
  title: 'Components/MobileLayout',
  component: MobileLayout,
} as Meta;

const Template: Story<MobileLayoutProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
