import { ButtonIconProps } from './ButtonIcon.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import ButtonIcon from './ButtonIcon';

export default {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
} as Meta;

const Template: Story<ButtonIconProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
