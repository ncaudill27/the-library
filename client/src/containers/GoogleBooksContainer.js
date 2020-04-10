import React, { Component } from 'react';

class GoogleBooksContainer extends Component {

  fetchBooks() {
    const google_key = process.env.REACT_APP_GOOGLE_BOOKS_KEY
    const isbn = "978-0-7660-6059-9".replace(/-/g, '')
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${google_key}`)
    // fetch('https://www.goodreads.com/author/list/18541?format=xml&key=' + key)
    .then(resp => resp.json())
    .then(list => console.log(list))
  }
  
  render() {
    return (
      <div>
        GoogleBooksContainer
        {this.fetchBooks()}
      </div>
    )
  }
}

export default GoogleBooksContainer;