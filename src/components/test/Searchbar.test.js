import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';

test('renders SearchBar component', () => {
  const { getByPlaceholderText } = render(<SearchBar searchQuery="" onSearchChange={() => {}} darkMode={false} />);
  expect(getByPlaceholderText('Search movies...')).toBeInTheDocument();
});

test('calls onSearchChange on input change', () => {
  const onSearchChange = jest.fn();
  const { getByPlaceholderText } = render(<SearchBar searchQuery="" onSearchChange={onSearchChange} darkMode={false} />);
  fireEvent.change(getByPlaceholderText('Search movies...'), { target: { value: 'Test' } });
  expect(onSearchChange).toHaveBeenCalledWith('Test');
});
