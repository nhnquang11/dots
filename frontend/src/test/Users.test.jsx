import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Users from '../components/Users';
import userService from '../services/userService';
import { vi } from 'vitest';

// Mocking userService
vi.mock('../services/userService');

const mockUsers = [
  {
    id: '1',
    registrationDate: '2022-01-01',
    profilePic: 'https://via.placeholder.com/40',
    username: 'user1',
    email: 'user1@example.com',
    isAdmin: false,
  },
  {
    id: '2',
    registrationDate: '2022-01-02',
    profilePic: 'https://via.placeholder.com/40',
    username: 'user2',
    email: 'user2@example.com',
    isAdmin: true,
  },
  // Add more mock users as needed
];

describe('Users', () => {
  beforeEach(() => {
    userService.getAll.mockResolvedValue(mockUsers);
    userService.remove.mockResolvedValue({});
    userService.update.mockResolvedValue({});
  });

  it('renders the list of users', async () => {
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('Users')).toBeInTheDocument();
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });
  });

  it('opens and closes the delete confirmation modal', async () => {
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(screen.getByText(/Are you sure you want to delete user1\?/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    await waitFor(() => {
      expect(screen.queryByText(/Are you sure you want to delete user1\?/i)).not.toBeInTheDocument();
    });
  });

  it('deletes a user', async () => {
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(screen.getByText(/Are you sure you want to delete user1\?/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Yes'));
    await waitFor(() => {
      expect(screen.queryByText('user1')).not.toBeInTheDocument();
    });
  });

  it('toggles the admin status', async () => {
    render(<Users />);

    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
    });

    const adminIcons = screen.getAllByRole('img', { name: '' });
    fireEvent.click(adminIcons[0]);

    await waitFor(() => {
      expect(userService.update).toHaveBeenCalledWith('1', { isAdmin: true });
    });
  });
});
