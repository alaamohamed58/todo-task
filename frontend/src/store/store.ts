import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
