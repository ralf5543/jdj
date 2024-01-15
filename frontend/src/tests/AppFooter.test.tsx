import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppFooter from '../components/AppFooter/AppFooter';

describe('test code', () => {
  it('3 + 5 should be 8', () => {
    expect(3 + 5).toBe(7);
  });

  it('AppFooter should be rendered', async () => {
    render(<AppFooter />);

    expect(await screen.findByText('AppFooter')).toBeInTheDocument();
  });
});
