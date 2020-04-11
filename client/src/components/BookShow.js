import React, { Component } from 'react';

class BookShow extends Component {

  fetchReview = () => {
    const {isbn} = this.props
    const key = `?api-key=${process.env.REACT_APP_NY_TIMES_KEY}`
    fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${isbn + key}`)
    .then(res => res.json())
    .then(list => console.log(json))
  }
  
  render() {
    return (
      <div className='Book-show'>
        
      </div>
    )
  }
}