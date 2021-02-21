import React from 'react';
import { render, screen } from '@testing-library/react';
import Snake from './Snake';

test('renders learn react link', () => {
  render(<Snake />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
