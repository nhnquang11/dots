import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notification from '../components/Notification';
import { vi } from 'vitest';

describe('Notification', () => {
  it('renders the Notification component with success style', () => {
    render(<Notification message="Success message" type="succes" onClose={() => { }} />);

    const notification = screen.getByText('Success message');
    expect(notification).toBeInTheDocument();
    expect(notification.parentElement).toHaveClass('bg-green-50');
    expect(notification.parentElement).toHaveClass('border-green-700');
    expect(notification.parentElement).toHaveClass('text-green-800');
  });

  it('renders the Notification component with error style', () => {
    render(<Notification message="Error message" type="error" onClose={() => { }} />);

    const notification = screen.getByText('Error message');
    expect(notification).toBeInTheDocument();
    expect(notification.parentElement).toHaveClass('bg-red-50');
    expect(notification.parentElement).toHaveClass('border-red-700');
    expect(notification.parentElement).toHaveClass('text-red-800');
  });

  it('renders the Notification component with default style', () => {
    render(<Notification message="Default message" type="info" onClose={() => { }} />);

    const notification = screen.getByText('Default message');
    expect(notification).toBeInTheDocument();
    expect(notification.parentElement).toHaveClass('bg-cyan-50');
    expect(notification.parentElement).toHaveClass('border-cyan-700');
    expect(notification.parentElement).toHaveClass('text-cyan-800');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Notification message="Close me" type="info" onClose={onClose} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('does not render when message is empty', () => {
    const { container } = render(<Notification message="" type="info" onClose={() => { }} />);
    expect(container.firstChild).toBeNull();
  });
});
