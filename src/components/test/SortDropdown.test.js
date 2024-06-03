import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SortDropdown from '../../components/SortDropdown';

test('renders SortDropdown component', () => {
  const { getByDisplayValue } = render(<SortDropdown sortOption="default" onSortChange={() => {}} darkMode={false} />);
  expect(getByDisplayValue('Sort by default')).toBeInTheDocument();
});

test('calls onSortChange on option change', () => {
  const onSortChange = jest.fn();
  const { getByDisplayValue } = render(<SortDropdown sortOption="default" onSortChange={onSortChange} darkMode={false} />);
  fireEvent.change(getByDisplayValue('Sort by default'), { target: { value: 'highest' } });
  expect(onSortChange).toHaveBeenCalledWith('highest');
});
