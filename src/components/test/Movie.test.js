import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Movie from '../Movie';

// Mock movie data
const movie = {
  title: 'Test Movie',
  year: 2021,
  description: 'This is a test movie description that is quite long. It should be truncated when not expanded.',
  imageURL: 'https://via.placeholder.com/150',
  averageRating: 4.0,
  numRatings: 10,
};

test('renders Movie component', () => {
  const { getByText, getByAltText } = render(<Movie movie={movie} darkMode={false} />);
  
  expect(getByText('Test Movie')).toBeInTheDocument();
  expect(getByText('(2021)')).toBeInTheDocument();
  expect(getByText('Avg. Rating: 4.0')).toBeInTheDocument();
  expect(getByText('10 ratings')).toBeInTheDocument();
  expect(getByAltText('Test Movie')).toBeInTheDocument();
});

test('toggles description on "Read more" and "Show less" click', () => {
  const { getByText } = render(<Movie movie={movie} darkMode={false} />);
  
  // Initially, only part of the description is shown
  expect(getByText(/This is a test movie description that is quite long./)).toBeInTheDocument();
  expect(getByText('Read more')).toBeInTheDocument();

  // Click "Read more" to expand the description
  fireEvent.click(getByText('Read more'));
  expect(getByText(/This is a test movie description that is quite long. It should be truncated when not expanded./)).toBeInTheDocument();
  expect(getByText('Show less')).toBeInTheDocument();

  // Click "Show less" to collapse the description
  fireEvent.click(getByText('Show less'));
  expect(getByText(/This is a test movie description that is quite long./)).toBeInTheDocument();
  expect(getByText('Read more')).toBeInTheDocument();
});
