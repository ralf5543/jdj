import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { expect, test } from '@jest/globals';
import App from '../components/App/App';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
});
