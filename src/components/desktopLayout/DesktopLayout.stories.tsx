import { DesktopLayoutProps } from './DesktopLayout.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import DesktopLayout from './DesktopLayout';

export default {
  title: 'Components/DesktopLayout',
  component: DesktopLayout,
} as Meta;

const Template: Story<DesktopLayoutProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
