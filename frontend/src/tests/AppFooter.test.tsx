import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AppFooter from '../components/AppFooter/AppFooter';

describe('AppFooter', () => {
  test('renders', () => {
    render(<AppFooter />);
    expect(screen.getByText('@Ralf')).toBeDefined();
  });
});
