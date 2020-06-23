import React, { Component } from 'react';
import AvatarSelection from '../components/AvatarSelection';
import FormField from './FormField';

class EditUser extends Component {

  state = {
    id: false,
    name: false,
    username: false,
    email: false,
    bio: false
  }

  renderEditForm = ({id, name, username, email, bio}) => {
    const inputValues = {id, name, username, email, bio};
    const inputNames = Object.keys(inputValues);
    this.setState(inputValues);

    return <FormField
      inputNames={inputNames}
      inputValues={inputValues}
    />
  }
  
  render() {
    console.log(this.state);
    
    const { currentUser } = this.props;

    return (
      <div className='Edit'>
        { currentUser ? this.renderEditForm(currentUser) : null }
      </div>
    )
  }
}

export default EditUser;