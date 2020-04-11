import React, { Component } from 'react';
import StarRating from './StarRating';

class BookShow extends Component {

  state = {
    bookData: {}
  }
  
  componentDidMount() {
    // this.fetchReview()
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
    if (bookData && Object.keys(bookData).length !== 0) {
    
    const {title, authors, publisher, publishedDate,
           description, categories, averageRating, imageLinks} = bookData;

    return (
      <>
      <img src={ imageLinks ? imageLinks.thumbnail : ''} alt={title + " Cover Art"} />
      <h2>{title}</h2>
      <h3>By: { authors ? [...authors].join(', ') : ''}</h3>
      <p>Average Rating: {averageRating}</p>
      <p>Categories: { categories ? [...categories].join(', ') : ''}</p>
      <p>Published: {publishedDate}</p>
      <p>Publisher: {publisher}</p>
      <p>{description}</p>
      </>
    );} else {
      // let rating = document.createElement('div')
      // rating.setAttribute('class', 'rating')
      // let i 
      // for (i = 0; i < 4; i++) {
      //   return <Star />
      // }
    }
  }
  
  render() {
    return (
      <div className='Book-show'>
        {this.renderBook(this.state.bookData)}
        <StarRating count={4} />
      </div>
    )
  }
}

export default BookShow;