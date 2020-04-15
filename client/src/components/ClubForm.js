import React, { Component } from 'react';
import FormField from './FormField';

class ClubForm extends Component {

  state = {
    name: '',
    description: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, ()=> console.log(this.state));
  };

  handleSubmit = e => {
    e.preventDefault()
    this.postClubRequest();
    this.setState({
      name: '',
      username: '',
      bio: ''
    });
  };

  postClubRequest = () => {
    let {
      props: {
        currentUser,
        updateCurrentUser
      },
      state
    } = this;

    const token = localStorage.getItem('token');
    const requestObj = {
      'method': 'POST',
      'headers': {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      'body': JSON.stringify(state)
    };

    fetch('/api/v1/clubs', requestObj)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      if (response.errors) return console.log(response.errors);
      currentUser = {
        ...currentUser,
        clubIds: [...currentUser.clubIds, response.club.data.id]
      };
      console.log(currentUser);
      updateCurrentUser(currentUser);
      
    })
  }


  render() {
    const {handleChange, handleSubmit, state} = this;
    const inputNames = Object.keys(state);
    const inputValues = Object.values(state);
    
    return (
      <div className='Club-form'>
        <h2>Create Club</h2>
        <FormField
          inputNames={inputNames}
          inputValues={inputValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
    </div>
    )
  }
}

export default ClubForm;