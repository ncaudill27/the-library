import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import { connect } from 'react-redux';
import { updateUserRequest } from '../actions/users';
import LeftArrow from '../return.png';
import RightArrow from '../arrow.png';
import Avatar from './Avatar';
import AvatarPreview from './AvatarPreview';

class AvatarSelection extends Component {

  unsplash = new Unsplash({ accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY });

  state = {
    photos: [],
    page: this.props.page,
    search: this.props.search,
    preview: '',
    avatar: this.props.currentUser.username
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log(this.state));
  }

  handleSearch = e => {
    e.preventDefault();
    this.fetchSelections();
  }

  setPreview = e => this.setState({ preview: e.target.src });

  setAvatar = e => this.setState({ avatar: e.target.value }, () => console.log(this.state));

  clearPreview = () => this.setState({ preview: '', avatar: this.props.currentUser.username });

  componentDidMount() {
    this.fetchSelections();
  }

  renderSelections = () => {
    return this.state.photos.map( ({id, photo}) =>
      <div key={id} onClick={this.setPreview}>
        <Avatar key={id} avatar={photo} />
      </div>
    );
  }
  
  fetchSelections = async () => {
    const photos = await this.unsplash.search.collections(this.state.search, this.state.page, 5)
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

  previousPage = () => {
    if (this.state.page > 1) this.setState( prevState => {
      return { page: prevState.page - 1 }
    }, this.fetchSelections)
  }

  navigation = () => 
    <div className='navigation'>
      <img onClick={this.previousPage} src={LeftArrow} alt='previous page arrow' />
      <h2>{this.state.page}</h2>
      <img onClick={this.nextPage} src={RightArrow} alt='next page arrow' />
    </div>;
  
  updateUserAvatar = e => {
    const { currentUser: {id}, updateUserRequest } = this.props;
    const avatar = e.target.src;
    const payload = {
      user: {
        id,
        avatar
      }
    };
    console.log(payload);
    
    updateUserRequest(payload, id);
  }

  searchBar = () => 
    <form onSubmit={this.handleSearch}>
      <label>Category
      <input type='text' name='search' value={this.state.search} onChange={this.handleChange} />
      </label>
      <input type='submit' value='Search' />
    </form>
  
  render() {
    const {
      state: {
        preview
      },
      props: {
        clubsCurrentUserMods,
        currentUser
      },
      searchBar,
      clearPreview,
      renderSelections,
      navigation,
      setAvatar
    } = this;
    
    console.log(this.state);
    
    return (
      <div className='Avatar-selection'>
        <h2>Choose an avatar!</h2>
        { searchBar() }
        {
          preview
          ? <AvatarPreview
              src={preview}
              cancel={clearPreview}
              clubsCurrentUserMods={clubsCurrentUserMods}
              currentUser={currentUser}
              setAvatar={setAvatar}
            />
          : null
        }
        <div className='photo-selection'>
          { renderSelections() }
        </div>
        { navigation() }
      </div>
    );
  };
}

AvatarSelection.defaultProps = {
  page: 1,
  search: 'Nature'
}

const mapStateToProps = ({users}) => ({memberships: users.memberships});


export default connect( mapStateToProps, { updateUserRequest } )(AvatarSelection);