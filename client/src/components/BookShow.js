import React, { Component } from 'react';
import StarRating from './StarRating';

class BookShow extends Component {

  state = {
    bookData: {}
  }

  componentDidMount() {
    this.fetchReview()
  }

  fetchReview = () => {
    const {isbn} = this.props
    const key = `${process.env.REACT_APP_GOOGLE_BOOKS_KEY}`
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${key}`)
    .then(res => res.json())
    .then(data => this.setState({ bookData: data.items[0].volumeInfo }, console.log(this.state, data)))
    .catch(errors => console.log(errors));
  }

  renderBook = bookData => {
    if (this.state.bookData && Object.keys(this.state.bookData).length !== 0) {
      const {title, authors, publisher, publishedDate,
            description, categories, averageRating, imageLinks} = this.state.bookData;

      return (
        <>
        <img id='book' src={ imageLinks ? imageLinks.thumbnail : ''} alt={title + " Cover Art"} />
        <div className='details'>
          <h3>{title}</h3>
          <h3>By: { authors ? [...authors].join(', ') : ''}</h3>
          { averageRating > 0 ? <StarRating count={averageRating} /> : null}
          <p>Categories: { categories ? [...categories].join(', ') : ''}</p>
          <p>Published: {publishedDate}</p>
          <p>Publisher: {publisher}</p>
        </div>
        <p>{description}</p>
        </>
      );
    } else {
      return <h3>Sorry we couldn't seem to find that book.</h3>
    };
  };
  
  render() {
    return (
      <div className='Book-show'>
        {this.renderBook()}
      </div>
    );
  };
}

export default BookShow;