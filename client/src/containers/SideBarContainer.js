import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addClub } from '../actions/users';
import UserBox from '../components/UserBox';
import ClubList from '../components/ClubList';

class SidebarContainer extends Component {

  componentDidUpdate(prevProps) {
    const {users: {data: users}} = this.props
    const currentUser = users.find( u => u.id === prevProps.currentUser.id)
    if (prevProps.currentUser.clubIds !== currentUser.clubIds) {
      console.log('this');
    }
  }

  render() {
    const {currentUser, clubs} = this.props
    let userClubs
    if (currentUser) userClubs = currentUser.clubIds.map(clubId => clubs.data.filter(club => club.id === clubId)).flat();
    return (
      <div className='Sidebar'>
        { !!currentUser && !!userClubs
        ? <>
          <UserBox user={currentUser} />
          <ClubList clubs={userClubs} styling='sidebar' />
          </>
        : null}
      </div>
    );
  }
}

const mapStateToProps = ({clubs, users}) => ({clubs, users});

export default connect(mapStateToProps, { addClub })(SidebarContainer);