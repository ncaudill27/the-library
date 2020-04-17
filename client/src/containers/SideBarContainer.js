import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addClub } from '../actions/users';
import UserBox from '../components/UserBox';
import ClubList from '../components/ClubList';
import SideNav from '../components/SideNav';

class SidebarContainer extends Component {

  render() {
    const {currentUser} = this.props
    return (
      <div className='Sidebar'>
        { !!currentUser
        ? <>
          <UserBox user={currentUser} />
          <ClubList styling='sidebar' />
          </>
        : <SideNav postion='sidebar' />}
      </div>
    );
  }
}

const mapStateToProps = ({users}) => {
  return {
    currentUser: users.currentUser
  }
};

export default connect(mapStateToProps, { addClub })(SidebarContainer);