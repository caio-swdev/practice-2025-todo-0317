import type { Meta, StoryObj } from '@storybook/react';
import { Todo } from './Todo';

const meta: Meta<typeof Todo> = {
  title: 'Components/Todo',
  component: Todo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Todo>;

export const Empty: Story = {
  args: {
    initialTodos: [],
  },
};

export const WithTodos: Story = {
  args: {
    initialTodos: [
      { id: '1', text: 'Learn Next.js', completed: true },
      { id: '2', text: 'Learn shadcn/ui', completed: false },
      { id: '3', text: 'Build a todo app', completed: false },
    ],
  },
};

export const AllCompleted: Story = {
  args: {
    initialTodos: [
      { id: '1', text: 'Learn HTML', completed: true },
      { id: '2', text: 'Learn CSS', completed: true },
      { id: '3', text: 'Learn JavaScript', completed: true },
    ],
  },
}; 