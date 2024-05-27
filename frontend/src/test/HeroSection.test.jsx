import { render } from '@testing-library/react';
import HeroSection from '../components/HeroSection';

test('renders the HeroSection component correctly', () => {
  const { getByText } = render(<HeroSection />);

  const title = getByText('Dots');
  const description = getByText('A place where the mind dances.');

  // Check that the title is rendered and has the correct classes
  expect(title).toBeInTheDocument();
  expect(title).toHaveClass('font-serif text-5xl lg:text-7xl font-bold tracking-tight text-neutral-900');

  // Check that the description is rendered and has the correct classes
  expect(description).toBeInTheDocument();
  expect(description).toHaveClass('font-serif mt-3 text-lg leading-8 text-neutral-600');
});
