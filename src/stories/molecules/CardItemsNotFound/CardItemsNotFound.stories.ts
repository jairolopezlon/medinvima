import type { Meta, StoryObj } from '@storybook/react'
import CardItemsNotFound from './CardItemsNotFound'

const meta: Meta<typeof CardItemsNotFound> = {
  argTypes: {},
  component: CardItemsNotFound,
  tags: ['autodocs'],
  title: 'Molecules/CardItemsNotFound',
}
export default meta
type Story = StoryObj<typeof CardItemsNotFound>

export const Default: Story = {}
