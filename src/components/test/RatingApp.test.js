import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RatingApp from '../../components/RatingApp';

// Mock Firebase functions and data
jest.mock('../../firebase/firebase', () => ({
  db: {},
}));

test('renders RatingApp component', async () => {
  render(<RatingApp />);
  expect(screen.getByText('Movie Rating App')).toBeInTheDocument();
});

test('toggles dark mode', () => {
  render(<RatingApp />);
  const toggleButton = screen.getByRole('button');
  fireEvent.click(toggleButton);
  expect(document.body.classList.contains('dark')).toBe(true);
  fireEvent.click(toggleButton);
  expect(document.body.classList.contains('dark')).toBe(false);
});
