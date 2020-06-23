import React, { Component } from 'react';
import Avatar from './Avatar';
import Unsplash, { toJson } from 'unsplash-js';

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
    const div = document.querySelector('.Avatar-selection');
    return this.state.photos.map( photo =>  <Avatar avatar={photo} /> );
  }
  
  fetchSelections = async () => {
    const photos = await this.unsplash.search.collections('nature', this.state.page, 20)
    .then(toJson)
    .then( json => json.results
      .map( obj => obj.preview_photos
        .map( photo => photo.urls.raw)
      )
    );
    this.setState({ photos });
  }

  navigation = () => 
    <div className='navigation'>
      <img src='client/src/return.png' alt='previous page arrow' />
      <h3>{this.state.page}</h3>
      <img src='client/src/arrow.png' alt='next page arrow' />
    </div>;
  
  render() {
    
    // this.unsplash.photos.getPhoto("pMK84mYVwTA")
    // .then(toJson)
    // .then(json => console.log(json))
    console.log(this.state.photos);
    

    return (
      <div className="Avatar-selection">
        { this.renderSelections() }
        { this.navigation() }
      </div>
    )
  }
}

AvatarSelection.defaultProps = {
  page: 1
}

export default AvatarSelection;

