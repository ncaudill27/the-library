import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AvatarSelection from '../components/AvatarSelection';
import FormField from './FormField';
import { connect } from 'react-redux';
import { updateUserRequest } from '../actions/users';

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: false,
      username: false,
      email: false,
      bio: false,
      redirect: null
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, console.log(this.state))
  }

  editUser = e => {
    const {props: {currentUser: {id}, state}} = this;
    e.preventDefault();
    console.log({user: state, id});
    this.props.updateUserRequest({user: state, id});
    this.setState({redirect: true});
  }

  renderEditForm = () => {
    const {name, username, email, bio} = this.state;
    const inputValues = {0: name, 1: username, 2: email, 3: bio};
    const inputNames = {0: "name", 1: "username", 2: "email", 3: "bio"};

    return <>
      <FormField
        handleChange={this.handleChange}
        handleSubmit={this.editUser}
        inputNames={inputNames}
        inputValues={inputValues}
        submitValue='Update'
      />
      <button onClick={() => this.setState({redirect: true})}>Cancel</button>
    </>
  }
  
  render() {

    const { currentUser, currentUser: {username} } = this.props;
    // console.log(currentUser);

    if (currentUser && !this.state.bio) {
      this.setState({
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.email,
        bio: currentUser.bio
      });
    }
    if (this.state.redirect) return <Redirect to={`/${username}`} />
    return (
      <div className='Edit'>
        { !!currentUser && this.state.bio !== false ? this.renderEditForm() : null }
      </div>
    )
  }
}

const mapStateToProps = ({users}) => ({currentUser: users.currentUser});

export default connect(mapStateToProps, { updateUserRequest })(EditUser);