import { configureStore } from '@reduxjs/toolkit'
import { api } from '../api/apiSlice'
import authSlice from "./reducers/auth/authSlice";
import eventSlice from "./reducers/event/eventSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        users: authSlice,
        events: eventSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware)
})



export type RootState = ReturnType<typeof store.getState>
