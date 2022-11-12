import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import AddBook from './AddBook';
import CardBook from './CardBook';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Books() {
  const books = useSelector((state) => state.books);
  return (
    <Container>
      {books.map((book) => (
        <CardBook
          key={book.item_id}
          id={book.item_id}
          name={book.title}
          author="Shedrack Sunday"
          category={books.category}
        />
      ))}
      <AddBook />
    </Container>
  );
}

export default Books;
