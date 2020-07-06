import React, { Component } from 'react';
import FormField from './FormField';
import { postClubRequest } from '../actions/clubs';
import { addClub } from '../actions/users';
import { connect } from 'react-redux';

class ClubForm extends Component {

  state = {
    name: '',
    description: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      state: {
        name, description
      },
      props: {
        postClubRequest
      }
    } = this;

    const payload = {
      club: {
        name,
        description
      }
    };
    
    postClubRequest(payload);
    this.setState({
      name: '',
      description: ''
    });
  };

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

export default connect(null, { postClubRequest, addClub })(ClubForm);