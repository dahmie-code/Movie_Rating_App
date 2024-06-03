import React from 'react';
import { render } from '@testing-library/react';
import MovieList from '../../components/MovieList';

const movies = [
  {
    id: '1',
    title: 'Test Movie 1',
    description: 'Description 1',
    imageURL: 'https://via.placeholder.com/150',
    year: 2021,
    averageRating: 4,
    numRatings: 10,
  },
  {
    id: '2',
    title: 'Test Movie 2',
    description: 'Description 2',
    imageURL: 'https://via.placeholder.com/150',
    year: 2022,
    averageRating: 3,
    numRatings: 5,
  },
];

test('renders MovieList component', () => {
  const { getByText } = render(<MovieList movies={movies} darkMode={false} />);
  expect(getByText('Test Movie 1')).toBeInTheDocument();
  expect(getByText('Test Movie 2')).toBeInTheDocument();
});
