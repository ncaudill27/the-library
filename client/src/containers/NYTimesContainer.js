import React, { Component } from 'react';
import BookList from '../components/BookList';

const options = [
  "Combined Print and E-Book Fiction",
  "Combined Print and E-Book Nonfiction",
  "Hardcover Fiction",
  "Hardcover Nonfiction",
  "Trade Fiction Paperback",
  "Mass Market Paperback",
  "Paperback Nonfiction",
  "E-Book Fiction",
  "E-Book Nonfiction",
  "Hardcover Advice",
  "Paperback Advice",
  "Advice How-To and Miscellaneous",
  "Hardcover Graphic Books",
  "Paperback Graphic Books",
  "Manga",
  "Combined Print Fiction",
  "Combined Print Nonfiction",
  "Chapter Books",
  "Childrens Middle Grade",
  "Childrens Middle Grade E-Book",
  "Childrens Middle Grade Hardcover",
  "Childrens Middle Grade Paperback",
  "Paperback Books",
  "Picture Books",
  "Series Books",
  "Young Adult",
  "Young Adult E-Book",
  "Young Adult Hardcover",
  "Young Adult Paperback",
  "Animals",
  "Audio Fiction",
  "Audio Nonfiction",
  "Business Books",
  "Celebrities",
  "Crime and Punishment",
  "Culture",
  "Education",
  "Espionage",
  "Expeditions Disasters and Adventures",
  "Fashion Manners and Customs",
  "Food and Fitness",
  "Games and Activities",
  "Graphic Books and Manga",
  "Hardcover Business Books",
  "Health",
  "Humor",
  "Indigenous Americans",
  "Relationships",
  "Mass Market Monthly",
  "Middle Grade Paperback Monthly",
  "Paperback Business Books",
  "Family",
  "Hardcover Political Books",
  "Race and Civil Rights",
  "Religion Spirituality and Faith",
  "Science",
  "Sports",
  "Travel",
  "Young Adult Paperback Monthly",
];

class NYTimesContainer extends Component {

  state = {
    select: 'hardcover-fiction',
    books: []
  }

  componentDidMount() {
    this.fetchBestSellers()
  }

  fetchBestSellers = () => {
    const key = `?api-key=${process.env.REACT_APP_NY_TIMES_KEY}`
    fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${this.state.select}.json${key}`)
    .then(res => res.json())
    .then(list => this.setState({
      books: list.results.books
      })
    );
  }

  selectOptions() {
    return options.map((cat, idx) => <option key={idx} value={cat.replace(/\s/g, '-').toLowerCase()}>{cat}</option>)
  }

  handleSelectChange = e => {
    this.setState({ 
      select: e.target.value
    }, ()=> this.fetchBestSellers())
  }
  
  render() {
    console.log(this.state);
    return (
      <div>
        <h1>New York Times Best Sellers</h1>
        <label>Categories </label>
        <select onChange={this.handleSelectChange} value={this.state.select}>
          {this.selectOptions()}
        </select>
        <BookList books={this.state.books} />
      </div>
    )
  }
}

export default NYTimesContainer;