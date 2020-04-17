import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addClub } from '../actions/users';
import UserBox from '../components/UserBox';
import ClubList from '../components/ClubList';
import SideNav from '../components/SideNav';

class SidebarContainer extends Component {

  userRender = () => {
    const { currentUser } = this.props
    return (
    <>
      <UserBox user={currentUser} />
      <NavLink
        to='/bestsellers'
        exact
        className='Create-club Navlink'
      ><div className='Club-sidebar Create-club'><h3>Bestsellers</h3></div></NavLink>
      <NavLink
        to='/clubs'
        exact
        className='Create-club Navlink'
      ><div className='Club-sidebar Create-club'><h3>Clubs</h3></div></NavLink>
      <ClubList styling='sidebar' />
    </>
    )
  }

  render() {
    const {props: currentUser, userRender} = this
    return (
      <div className='Sidebar'>
        { !!currentUser
        ? userRender()
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