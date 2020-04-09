import React, { Component } from 'react';

class GoogleBooksContainer extends Component {

  fetchBooks() {
    const google_key = process.env.REACT_APP_GOOGLE_BOOKS_KEY
    fetch(`https://www.googleapis.com/books/v1/volumes?q=swords+inauthor:martin&key=${google_key}`)
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