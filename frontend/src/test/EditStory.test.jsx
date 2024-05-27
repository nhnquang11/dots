import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { store } from '../reducers/store';
import EditStory from '../pages/EditStory';
import topicService from '../services/topicService';
import storyService from '../services/storyService';
import uploadService from '../services/uploadService';
import { setUser } from '../reducers/userReducer';

// Mock the services
vi.mock('../services/topicService');
vi.mock('../services/storyService');
vi.mock('../services/uploadService');

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn();

const renderWithProviders = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/edit/:id" element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('EditStory', () => {
  const mockTopics = [
    { id: '1', name: 'Topic 1' },
    { id: '2', name: 'Topic 2' },
  ];

  const mockStory = {
    id: '1',
    title: 'Mock Title',
    description: 'Mock Description',
    content: 'Mock Content',
    imageUrl: 'mockImageUrl.jpg',
    topics: [{ id: '1', name: 'Topic 1' }],
  };

  const mockUser = {
    token: 'mock-token',
    id: 'user1',
    username: 'mockuser',
  };

  beforeAll(() => {
    topicService.getAll.mockResolvedValue(mockTopics);
    storyService.getOne.mockResolvedValue(mockStory);
    uploadService.uploadImage.mockResolvedValue({ imageUrl: 'uploadedImageUrl.jpg' });
    store.dispatch(setUser(mockUser)); // Set mock user in the store
  });

  test('renders EditStory component and fetches initial data', async () => {
    renderWithProviders(<EditStory />, { route: '/edit/1' });

    expect(screen.getByPlaceholderText(/Title/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/)).toBeInTheDocument();

    await waitFor(() => {
      expect(topicService.getAll).toHaveBeenCalled();
      expect(storyService.getOne).toHaveBeenCalledWith('1');
    });

    expect(screen.getByDisplayValue('Mock Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Mock Description')).toBeInTheDocument();
    expect(screen.getByAltText('preview')).toBeInTheDocument();
    expect(screen.getByLabelText('Story preview')).toBeInTheDocument();
  });

  test('handles file upload and updates preview image', async () => {
    renderWithProviders(<EditStory />, { route: '/edit/1' });

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText('Story preview');
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('example.png')).toBeInTheDocument();
    });
  });
});