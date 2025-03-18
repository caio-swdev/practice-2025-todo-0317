import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Todo } from '../Todo';

// Mock the sonner toast
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn()
  }
}));

describe('Todo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders todo component with empty state', () => {
    render(<Todo />);

    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-todo-button')).toBeInTheDocument();
  });

  test('adds a new todo when button is clicked', () => {
    render(<Todo />);

    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');

    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
    expect(screen.queryByText('No todos yet. Add one above!')).not.toBeInTheDocument();
  });

  test('adds a new todo when Enter key is pressed', () => {
    render(<Todo />);

    const input = screen.getByTestId('todo-input');

    fireEvent.change(input, { target: { value: 'Todo with Enter' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByText('Todo with Enter')).toBeInTheDocument();
  });

  test('marks todo as completed when toggled', () => {
    render(<Todo initialTodos={[{ id: '1', text: 'Test Todo', completed: false }]} />);

    const toggleButton = screen.getByTestId('toggle-todo-1');
    fireEvent.click(toggleButton);

    // The todo text should have the line-through style when completed
    expect(screen.getByText('Test Todo').parentElement?.parentElement).toHaveClass('line-through');
  });

  test('deletes a todo when delete button is clicked', () => {
    render(<Todo initialTodos={[{ id: '1', text: 'Test Todo', completed: false }]} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();

    const deleteButton = screen.getByTestId('delete-todo-1');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument();
  });
}); 