import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmationModal from '../components/ConfirmationModal';
import { vi } from 'vitest';

describe('ConfirmationModal', () => {
  it('renders the ConfirmationModal component with the correct message', () => {
    render(<ConfirmationModal message="Are you sure?" handleClose={() => { }} handleSubmit={() => { }} />);

    expect(screen.getByText('Hang on a sec!')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('calls handleClose when the cancel button is clicked', () => {
    const handleClose = vi.fn();
    render(<ConfirmationModal message="Are you sure?" handleClose={handleClose} handleSubmit={() => { }} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(handleClose).toHaveBeenCalled();
  });

  it('calls handleClose when the close icon is clicked', () => {
    const handleClose = vi.fn();
    render(<ConfirmationModal message="Are you sure?" handleClose={handleClose} handleSubmit={() => { }} />);

    const closeIcon = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeIcon);

    expect(handleClose).toHaveBeenCalled();
  });

  it('calls handleSubmit when the yes button is clicked', () => {
    const handleSubmit = vi.fn();
    render(<ConfirmationModal message="Are you sure?" handleClose={() => { }} handleSubmit={handleSubmit} />);

    const yesButton = screen.getByText('Yes');
    fireEvent.click(yesButton);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
