import React, { Component } from 'react';
import BookList from '../components/BookList';

class NYTimes extends Component {

  state = {
    select: 'hardcover-fiction',
    books: [],
    options: []
  }

  async componentDidMount() {
    let options = await this.fetchOptions()
    options = [...new Set(options)]
    this.setState({options})
    this.fetchBestSellers()
  }

  fetchBestSellers = () => {
    const key = process.env.REACT_APP_NY_TIMES_KEY
    fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${this.state.select}.json?api-key=${key}`)
    .then(res => res.json())
    .then(list => this.setState({
      books: list.results.books
      })
    );
  }

  fetchOptions() {
    return fetch('https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=' + process.env.REACT_APP_NY_TIMES_KEY)
    .then(res => res.json())
    .then(list => list.results.map(type => type.list_name));
  }

  selectOptions() {
    return this.state.options.map((cat, idx) => <option key={idx} value={cat.replace(/\s/g, '-').toLowerCase()}>{cat}</option>)
  }

  handleSelectChange = e => {
    this.setState({ 
      select: e.target.value
    }, this.fetchBestSellers)
  }
  
  render() {
    return (
      <div>
        <h1>New York Times Best Sellers</h1>
        <div className='NYTimes'>
          <label>Categories </label>
          <select onChange={this.handleSelectChange} value={this.state.select}>
            {this.selectOptions()}
          </select>
          <BookList books={this.state.books} />
        </div>
      </div>
    )
  }
}

export default NYTimes;