import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  argTypes: {
    classname: {
      control: { type: 'text' },
      defaultValue: 'h-[50px]',
      description: 'The classname for the skeleton',
    },
  },
  component: Skeleton,
  tags: ['autodocs'],
  title: 'Atoms/Skeleton',
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const SkeletonSample1: Story = {
  args: {
    classname: 'h-[300px]',
  },
}
export const SkeletonSample2: Story = {
  args: {
    classname: 'h-[100px]',
  },
}
