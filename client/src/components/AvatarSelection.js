import React, { Component } from 'react';
import Avatar from './Avatar';
import Unsplash, { toJson } from 'unsplash-js';
import LeftArrow from '../return.png';
import RightArrow from '../arrow.png';

class AvatarSelection extends Component {

  state = {
    photos: [],
    page: this.props.page
  }

  unsplash = new Unsplash({ accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY });

  componentDidMount() {
    this.fetchSelections();
  }

  renderSelections = () => {
    return this.state.photos.map( ({id, photo}) =>  <Avatar key={id} avatar={photo} /> );
  }
  
  fetchSelections = async () => {
    const photos = await this.unsplash.search.collections('nature', this.state.page, 5)
    .then(toJson)
    .then( json => json.results
      .map( obj => obj.preview_photos
        .map( photo => ({id: photo.id, photo: photo.urls.raw}))
      )
    );
    this.setState({ photos: photos.flat() });
  }
  
  nextPage = () => this.setState( prevState => {
    return { page: prevState.page + 1 }
  }, this.fetchSelections);

  lastPage = () => {
    if (this.state.page > 1) this.setState( prevState => {
      return { page: prevState.page - 1 }
    }, this.fetchSelections)
  }

  navigation = () => 
    <div className='navigation'>
      <img onClick={this.lastPage} src={LeftArrow} alt='previous page arrow' />
      <h2>{this.state.page}</h2>
      <img onClick={this.nextPage} src={RightArrow} alt='next page arrow' />
    </div>;
  
  render() {

    return (
      <div className='Avatar-selection'>
        <h2>Choose an avatar!</h2>
        <div className='photo-selection'>
          { this.renderSelections() }
        </div>
        { this.navigation() }
      </div>
    )
  }
}

AvatarSelection.defaultProps = {
  page: 1
}

export default AvatarSelection;

