import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import Movie from '../../components/Movie';

const movie = {
  id: '1',
  title: 'Test Movie',
  description: 'This is a test movie description that is quite long.',
  imageURL: 'https://via.placeholder.com/150',
  year: 2021,
  averageRating: 4,
  numRatings: 10,
};

test('renders Movie component', () => {
  const { getByText, getByAltText } = render(<Movie movie={movie} darkMode={false} />);
  expect(getByText('Test Movie')).toBeInTheDocument();
  expect(getByText('(2021)')).toBeInTheDocument();
  expect(getByText('Avg. Rating: 4.0')).toBeInTheDocument();
  expect(getByAltText('Test Movie')).toBeInTheDocument();
});

test('toggles description on "Read more" and "Show less" click', () => {
  const { getByText } = render(<Movie movie={movie} darkMode={false} />);
  fireEvent.click(getByText('Read more'));
  expect(getByText('Show less')).toBeInTheDocument();
  fireEvent.click(getByText('Show less'));
  expect(getByText('Read more')).toBeInTheDocument();
});

test('calls onRatingClick when a star is clicked', () => {
  const onRatingClick = jest.fn();
  const { getAllByTitle } = render(<Movie movie={movie} onRatingClick={onRatingClick} darkMode={false} />);
  fireEvent.click(getAllByTitle('1 star')[0]);
  expect(onRatingClick).toHaveBeenCalledWith('Test Movie', 1);
});
