import { CarouselProps } from './Carousel.props';
import { Meta, Story } from '@storybook/react';
import { MissingStory } from '../../utils/storybookHelpers';
import Carousel from './Carousel';

export default {
  title: 'Components/Carousel',
  component: Carousel,
} as Meta;

const Template: Story<CarouselProps> = () => MissingStory;

export const Primary = Template.bind({});
Primary.args = {};
