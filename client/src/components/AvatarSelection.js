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
    //if (this.state.photos === []) this.fetchSelections();
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
  
  nextPage = () => this.setState( prevState => {
    return { page: prevState.page + 1 }
  }, console.log(this.state));

  lastPage = () => {
    if (this.state.page > 1) this.setState( prevState => {
      return { page: prevState.page - 1 }
    })
  }

  navigation = () => 
    <div className='navigation'>
      <img onClick={this.lastPage} src={LeftArrow} alt='previous page arrow' />
      <h3>{this.state.page}</h3>
      <img onClick={this.nextPage} src={RightArrow} alt='next page arrow' />
    </div>;
  
  render() {
    
    // this.unsplash.photos.getPhoto("pMK84mYVwTA")
    // .then(toJson)
    // .then(json => console.log(json))
    console.log(this.state.page);
    

    return (
      <div className="Avatar-selection">
        {/* { this.renderSelections() } */}
        { this.navigation() }
      </div>
    )
  }
}

AvatarSelection.defaultProps = {
  page: 1
}

export default AvatarSelection;

