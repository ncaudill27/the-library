import React, { Component } from 'react';
import AvatarSelection from '../components/AvatarSelection';
import FormField from './FormField';
import { connect } from 'react-redux';

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: false,
      username: false,
      email: false,
      bio: false
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, console.log(this.state))
  }

  renderEditForm = () => {
    const {name, username, email, bio} = this.state;
    const inputValues = {0: name, 1: username, 2: email, 3: bio};
    const inputNames = {0: "name", 1: "username", 2: "email", 3: "bio"};

    return <FormField
      handleChange={this.handleChange}
      inputNames={inputNames}
      inputValues={inputValues}
    />
  }
  
  render() {
    console.log(this.state);
    
    const { currentUser } = this.props;
    console.log(currentUser);
    if (!!currentUser && !this.state.bio) {
      this.setState({
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.email,
        bio: currentUser.bio
      })
    }

    return (
      <div className='Edit'>
        { !!currentUser && this.state.bio ? this.renderEditForm() : null }
      </div>
    )
  }
}

const mapStateToProps = ({users}) => ({currentUser: users.currentUser});

export default connect(mapStateToProps)(EditUser);