import React, { Component } from 'react';
import Book from './Book';

class BookList extends Component {

  renderBooks() {
    return this.props.books.map(book => 
      <Book
        key={book.primary_isbn13}
        title={book.title}
        author={book.author}
        publisher={book.publisher}
        description={book.description}
        src={book.book_image}
        amazonUrl={book.amazon_product_url}
        isbn10={book.primary_isbn10}
        isbn13={book.primary_isbn13}
      />
    );
  }

  render() {
    return (
      <div className='Book-list'>
        {this.renderBooks()}
      </div>
    );
  }
}

export default BookList;