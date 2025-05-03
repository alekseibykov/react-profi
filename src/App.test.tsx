import { render, screen, waitFor, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import authReducer, { setIsAuth, setUser } from './store/reducers/auth/authSlice';
import eventReducer from './store/reducers/event/eventSlice';
import { api } from './api/apiSlice';
import { IUser } from './models/IUser';

// Mocks
jest.mock('@reduxjs/toolkit/query', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query'),
  fetchBaseQuery: () => ({
    baseUrl: '/',
    fetchFn: async (): Promise<Response> => new Response(JSON.stringify({}), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' }
    })
  })
}));

jest.mock('./api/apiSlice', () => ({
  ...jest.requireActual('./api/apiSlice'),
  useGetUsersQuery: () => ({
    data: [] as IUser[],
    isLoading: false,
    isSuccess: true,
    error: null as Error | null
  }),
  api: {
    reducerPath: 'api',
    reducer: (): any => ({}),
    middleware: () => (next: any) => (action: any) => next(action)
  }
}));

// Mock localStorage
type StorageItems = {
  [key: string]: string | null;
};

const createStorageMock = () => {
  const storage: StorageItems = {};
  return {
    getItem: jest.fn((key: string) => storage[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      storage[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete storage[key];
    }),
    clear: jest.fn(() => {
      Object.keys(storage).forEach(key => {
        delete storage[key];
      });
    })
  };
};

const localStorageMock = createStorageMock();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Test helpers
const createTestStore = (preloadedState = {}) => configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    users: authReducer,
    events: eventReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  preloadedState: {
    users: { isAuth: false, error: '', isLoading: false, user: { username: '' } },
    events: { guests: [], events: [] },
    [api.reducerPath]: {},
    ...preloadedState
  }
});

const renderWithStore = async (ui: React.ReactElement, store = createTestStore()) => {
  await act(async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    );
  });
  return { store };
};

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  it('renders without crashing and shows login button when not authenticated', async () => {
    await renderWithStore(<App />);
    expect(screen.getByText('Логин')).toBeInTheDocument();
  });

  it('shows user info and logout button when authenticated', async () => {
    const store = createTestStore();
    await renderWithStore(<App />, store);
    
    await act(async () => {
      store.dispatch(setIsAuth(true));
      store.dispatch(setUser({ username: 'testuser' }));
    });
    
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('Выйти')).toBeInTheDocument();
    });
  });

  it('restores authentication from localStorage on mount', async () => {
    localStorageMock.setItem('auth', 'true');
    localStorageMock.setItem('username', 'saveduser');

    await renderWithStore(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('saveduser')).toBeInTheDocument();
      expect(screen.getByText('Выйти')).toBeInTheDocument();
    });
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('auth');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('username');
  });

  it('handles logout correctly', async () => {
    const store = createTestStore();
    await renderWithStore(<App />, store);
    
    await act(async () => {
      store.dispatch(setIsAuth(true));
      store.dispatch(setUser({ username: 'testuser' }));
    });

    await waitFor(() => expect(screen.getByText('Выйти')).toBeInTheDocument());

    await act(async () => {
      screen.getByText('Выйти').click();
    });

    await waitFor(() => {
      expect(screen.getByText('Логин')).toBeInTheDocument();
      expect(screen.queryByText('testuser')).not.toBeInTheDocument();
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('username');
  });
}); 