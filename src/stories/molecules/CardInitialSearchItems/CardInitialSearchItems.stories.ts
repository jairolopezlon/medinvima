import type { Meta, StoryObj } from '@storybook/react'
import CardInitialSearchItems from './CardInitialSearchItems'

const meta: Meta<typeof CardInitialSearchItems> = {
  argTypes: {},
  component: CardInitialSearchItems,
  tags: ['autodocs'],
  title: 'Molecules/CardInitialSearchItems',
}
export default meta
type Story = StoryObj<typeof CardInitialSearchItems>

export const Default: Story = {}
