import type { Meta, StoryObj } from '@storybook/react'
import { SkeletonCardSearchingItems } from '@components/molecules'

const meta: Meta<typeof SkeletonCardSearchingItems> = {
  argTypes: { customClass: { type: 'string' } },
  component: SkeletonCardSearchingItems,
  tags: ['autodocs'],
  title: 'Molecules/SkeletonCardSearchingItems',
}

export default meta
type Story = StoryObj<typeof SkeletonCardSearchingItems>

export const Default: Story = {}
