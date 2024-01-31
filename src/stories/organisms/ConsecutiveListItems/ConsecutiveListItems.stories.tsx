import type { Meta, StoryObj } from '@storybook/react'

import ConsecutiveListItems from './ConsecutiveListItems'

const meta: Meta<typeof ConsecutiveListItems> = {
  argTypes: {},
  component: ConsecutiveListItems,
  tags: ['autodocs'],
  title: 'organisms/ConsecutiveListItems',
}

export default meta
type Story = StoryObj<typeof ConsecutiveListItems>

export const Default: Story = {}