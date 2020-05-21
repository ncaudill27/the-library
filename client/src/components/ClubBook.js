import React, { Component } from 'react';
import StarRating from './StarRating';

class ClubBook extends Component {

  state = {
    book: false
  };

  componentDidMount() {
    this.fetchBookInfo();
  }
  
  fetchBookInfo() {
      const {isbn} = this.props
      const key = `${process.env.REACT_APP_GOOGLE_BOOKS_KEY}`
      fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${key}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ book: data.items[0].volumeInfo }
        )
      })
      .catch(errors => console.log(errors));
  }
  
  render() {
    console.log(this.props);
    
    if (this.state.book) {
      let {title, authors, averageRating, imageLinks} = this.state.book;
      return (
        <div className='Club-book'>
          <img id="clubbook" src={ imageLinks ? imageLinks.thumbnail : ''} alt={title + " Cover Art"} />
          <div className='Club-book-details'>
            <h3>{title}</h3>
            <p>{authors}</p>
            <StarRating count={averageRating} />
          </div>
        </div>
      );
    } else {
      return <p>loading...</p>;
    };
  };
}

export default ClubBook;