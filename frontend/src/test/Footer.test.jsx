import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'

test('renders content', () => {
  render(<Footer />)

  const element = screen.getByText('Dots © 2024')
  expect(element).toBeDefined()
})
