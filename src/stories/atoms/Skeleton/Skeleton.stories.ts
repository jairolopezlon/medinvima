import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from '..'

const meta: Meta<typeof Skeleton> = {
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'The content of the skeleton',
    },
    customClass: {
      control: { type: 'text' },
      description: 'The classname for the skeleton',
    },
    height: {
      control: { type: 'number' },
      description: 'The height of the skeleton',
    },
    radius: {
      control: { type: 'number' },
      description: 'The radius of the skeleton',
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Whether the skeleton is rounded',
    },
    width: {
      control: { type: 'number' },
      description: 'The width of the skeleton',
    },
  },
  args: {
    rounded: false,
  },
  component: Skeleton,
  tags: ['autodocs'],
  title: 'Atoms/Skeleton',
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const SkeletonSimpleCard: Story = {
  args: {
    height: 200,
    radius: 8,
    width: 300,
  },
}
export const SkeletonSimpleCircle: Story = {
  args: {
    height: 50,
    rounded: true,
    width: 50,
  },
}
