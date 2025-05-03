import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import EventForm from './EventForm';
import { IUser } from '../models/IUser';

// Mock dependencies
jest.mock('../utils/rules', () => ({
  rules: {
    required: () => ({ required: true, message: 'Обязательное поле' }),
    isDateAfter: () => () => ({ validator: () => Promise.resolve() })
  }
}));

jest.mock('../utils/date', () => ({
  formatDate: () => '2023.05.20'
}));

// Create mock store
const mockStore = configureStore({
  reducer: {
    users: () => ({ user: { username: 'testuser' } })
  }
});

describe('EventForm Component', () => {
  const mockGuests = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' }
  ];
  
  const mockSubmit = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders form with required fields', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <EventForm guests={mockGuests} submit={mockSubmit} />
      </Provider>
    );
    
    // Verify form exists
    expect(container.querySelector('form')).toBeInTheDocument();
    
    // Verify button
    expect(screen.getByRole('button', { name: /создать/i })).toBeInTheDocument();
    
    // Verify field labels
    expect(screen.getByText('Описание события')).toBeInTheDocument();
    expect(screen.getByText('Дата события')).toBeInTheDocument();
    expect(screen.getByText('Выберите гостя')).toBeInTheDocument();
  });
}); 