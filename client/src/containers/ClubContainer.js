import React, { Component } from 'react';
import { connect } from 'react-redux';
import { memberJoinRequest, memberLeaveRequest } from '../actions/clubs';
import ThreadList from '../components/ThreadList';

class ClubContainer extends Component {

  currentUserIsMember() {
    const {currentUser, clubId, clubs} = this.props;
    const club = clubs.find(club => club.id === clubId);
    return !!club.memberIds.includes(currentUser.id);
  }

  handleJoin = () => {
    const {clubId, memberJoinRequest} = this.props;
    const payload = {
      membership: {
        club_id: clubId
      }
    }
    memberJoinRequest(payload);
  }

  handleLeave = () => {
    const {clubId, memberLeaveRequest} = this.props;
    memberLeaveRequest(clubId);
  }

  renderClub = (club, threads, currentUser) => {
    if (club && threads) {
      const {name, description} = club
      const clubThreads = club.threadIds.map(threadId => threads.filter(thread=> thread.id === threadId)).flat()

      return (
        <>
          <div className='Club-details'>
            <h1>{name}</h1>
            {this.currentUserIsMember() ? <h3 id='leave' onClick={this.handleLeave}>Leave Club</h3> : <h3 id='join' onClick={this.handleJoin}>Join Club</h3>}
            <p>{description}</p>
          </div>
          <ThreadList threads={clubThreads} club={club} currentUser={currentUser} />
        </>
      )
    }
  }

  render() {
    const {clubId, clubs, clubsPending, threads, currentUser} = this.props
    const club = clubs.find(club => club.id === clubId);

    return (
      <div className='Club-container'>
        {clubsPending === true ? <p>loading....</p> : this.renderClub(club, threads, currentUser)}
      </div>
    )
  }
}

const mapStateToProps = ({clubs, threads, users}) => {
  return {
    clubs: clubs.data,
    clubsPending: clubs.pending,
    threads: threads.data,
    threadsPending: threads.pending,
    currentUser: users.currentUser
  }
};

export default connect(mapStateToProps, { memberJoinRequest, memberLeaveRequest })(ClubContainer);