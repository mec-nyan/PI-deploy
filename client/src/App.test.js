import { render, screen } from '@testing-library/react';
import App from './App';

test('render enter button', () => {
  render(<App />);
  const linkElement = screen.getByTitle(/enter/i);
  expect(linkElement).toBeInTheDocument();
});
