import { render } from '@testing-library/react';
import React from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';

test('renders LoadingSpinner component', () => {
  const { container } = render(<LoadingSpinner />);
  expect(container.getElementsByClassName('loader').length).toBe(1);
});
