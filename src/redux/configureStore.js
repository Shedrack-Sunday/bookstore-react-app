import { configureStore } from '@reduxjs/toolkit';
import reducer from './books/books';

const store = configureStore({
  reducer: {
    books: reducer,
  },
});

export default store;
