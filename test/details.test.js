import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DetailsPage from '../src/pages/details-page';

test('renders details page with postID 65f1cebd740119f5c836d1b3', async () => {
  // Mock the API call
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        post: {
          _id: '65f1cebd740119f5c836d1b3',
          title: 'Test Title',
          description: 'Test Description',
          imageLink: 'Test Image Link',
        },
      }),
    })
  );

  render(
    <Router>
      <DetailsPage match={{ params: { postId: '65f1cebd740119f5c836d1b3' } }} />
    </Router>
  );

  // Wait for the page to update
  const title = await screen.findByText(/Test Title/i);
  const description = await screen.findByText(/Test Description/i);

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});