/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';

const ADD_BOOK = 'bookStore/books/ADD_BOOK';
const REMOVE_BOOK = 'bookStore/books/REMOVE_BOOK';
const GET_CURRENT_API = 'bookStore/books/GET_CURRENT_API';
const API = `
  https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/0ePu6tv5E4TBgiHo9yos/books/`;

const initialState = [];

export const getApi = createAsyncThunk(GET_CURRENT_API, async () => {
  const result = await fetch(API, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  const response = result.json();
  return response;
});

export const removeBook = createAsyncThunk(REMOVE_BOOK, (payload) => {
  fetch(`${API}${payload}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      item_id: payload,
    }),
  });
  return payload;
});

export const addBook = createAsyncThunk(ADD_BOOK, (newBook) => {
  fetch(API, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newBook),
  });
  return newBook;
});

/* eslint-disable-next-line */
const reducer = (state = initialState, action) => {
  const newArray = [];
  switch (action.type) {
    case `${ADD_BOOK}/fulfilled`:
      return [...state, action.payload];
    case `${REMOVE_BOOK}/fulfilled`: {
      return state.filter((book) => book.item_id !== action.payload);
    }
    case `${GET_CURRENT_API}/fulfilled`:
      Object.keys(action.payload).forEach((element) => {
        const book = action.payload[element][0];
        book.item_id = element;
        newArray.push(book);
      });
      return newArray;
    default:
      return state;
  }
};

export default reducer;
