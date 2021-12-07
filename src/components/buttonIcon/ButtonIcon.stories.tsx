import { Story, Meta } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import ButtonIcon from './ButtonIcon';
import { ButtonIconProps } from './ButtonIcon.props';

export default {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
} as Meta;

const Template: Story<ButtonIconProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
