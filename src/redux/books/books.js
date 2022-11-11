/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit';

const ADD_BOOK = 'bookStore/books/ADD_BOOK';
const REMOVE_BOOK = 'bookStore/books/REMOVE_BOOK';
const GET_CURRENT_API = 'bookStore/books/GET_CURRENT_API';
const GET_CURRENT_API_SUCCESS = 'bookStore/books/GET_CURRENT_API_SUCCESS';
const GET_CURRENT_API_FAILURE = 'bookStore/books/GET_CURRENT_API_FAILURE';
const API = `
  https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/0ePu6tv5E4TBgiHo9yos/books`;

const initialState = {
  status: 'Idle',
  books: {},
};

//  CreatAyncThunk Implimentation
 /* const addbk = createAsyncThunk(ADDBOOK, async (obj) => {
  const url =
    'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/0ePu6tv5E4TBgiHo9yos/books';
  await fetch(url, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
});

 const getbook = createAsyncThunk(GETBOOK, async () => {
  const url =
    'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/0ePu6tv5E4TBgiHo9yos/books';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  });
  const result = await response.json();
});

 const remBook = createAsyncThunk(REMBOOK, async (id) => {
  const url = `https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/0ePu6tv5E4TBgiHo9yos/books${id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: id }),
  });
}); */

export const getApi = async (dispatch) => {
  dispatch({ type: GET_CURRENT_API });
  const books = await fetch(API).then((res) => res.json());
  return dispatch({ type: GET_CURRENT_API_SUCCESS, books });
};

export const removeBook = (payload) => async (dispatch) => {
  const response = await fetch(API + payload, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((res) => res.status);
  const result = response === 201 ? 'Book removed' : 'Fail to remove';
  dispatch(getApi);
  return dispatch({ type: REMOVE_BOOK, result });
};

export const addBook = (newBook) => async (dispatch) => {
  const response = await fetch(API, {
    method: 'POST',
    body: JSON.stringify(newBook),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.status);
  const result = response === 201 ? 'Book adding' : 'Fail to post';
  dispatch(getApi);
  return dispatch({ type: ADD_BOOK, result });
};

/* eslint-disable-next-line */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        status: action.result,
      };
    case REMOVE_BOOK: {
      if (action.response === 201) {
        return {
          ...state,
          status: 'Book Remove',
        };
      }
      return state;
    }
    case GET_CURRENT_API:
      return {
        ...state,
        status: 'Loading',
      };
    case GET_CURRENT_API_SUCCESS:
      return {
        books: action.books,
        status: 'SUCCESS',
      };
    case GET_CURRENT_API_FAILURE:
      return {
        ...state,
        status: 'ERROR',
      };
    default:
      return state;
  }
};

export const selectBooks = (state) => state.booksReducer.books;

export default reducer;
