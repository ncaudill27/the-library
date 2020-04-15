import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addClub } from '../actions/users';
import UserBox from '../components/UserBox';
import ClubList from '../components/ClubList';

class SidebarContainer extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.clubs !== prevProps.clubs) {
      const newClub = this.props.clubs.data.slice(-1);
      return newClub[0] ? this.props.addClub(newClub.id, this.props.currentUser.id) : null
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

const mapStateToProps = ({clubs}) => ({clubs});

export default connect(mapStateToProps, { addClub })(SidebarContainer);