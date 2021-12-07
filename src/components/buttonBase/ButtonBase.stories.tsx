import { Story, Meta } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import ButtonBase from './ButtonBase';
import { ButtonBaseProps } from './ButtonBase.props';

export default {
  title: 'Components/ButtonBase',
  component: ButtonBase,
} as Meta;

const Template: Story<ButtonBaseProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
