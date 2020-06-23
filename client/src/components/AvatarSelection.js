import React, { Component } from 'react';
import Avatar from './Avatar';
import Unsplash, { toJson } from 'unsplash-js';

class AvatarSelection extends Component {

  state = {
    photos: []
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
    await this.setState({photos: []})
    const photos = await this.unsplash.search.collections('nature', 7, 20)
    .then(toJson)
    .then( json => json.results
      .map( obj => obj.preview_photos
        .map( photo => photo.urls.raw)
      )
    );
    this.setState({ photos })
  }
  
  render() {
    
    // this.unsplash.photos.getPhoto("pMK84mYVwTA")
    // .then(toJson)
    // .then(json => console.log(json))
    console.log(this.state.photos);
    

    return (
      <div className="Avatar-selection">
        {this.renderSelections()}
      </div>
    )
  }
}

export default AvatarSelection;