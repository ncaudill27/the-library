import React, { Component } from 'react';
import { connect } from 'react-redux';
import { memberJoinRequest, memberLeaveRequest } from '../actions/clubs';
import ThreadList from '../components/ThreadList';
import ClubBook from '../components/ClubBook';

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
    };
    memberJoinRequest(payload);
  }

  handleLeave = () => {
    const {clubId, memberLeaveRequest} = this.props;
    memberLeaveRequest(clubId);
  }

  renderMembershipButton = currentUser => 
    currentUser
    ? this.currentUserIsMember()
      ? <h3 id='leave' onClick={this.handleLeave}>Leave Club</h3>
      : <h3 id='join' onClick={this.handleJoin}>Join Club</h3>
    : null;

  renderModOptions = (currentUser, clubId) =>
    currentUser.modClubIds.includes(clubId)
    ? console.log('hello')
    : null 
  

  renderClub = () => {
    const {clubId, clubs, threads, currentUser} = this.props;
    const club = clubs.find(club => club.id === clubId);
    if (club && threads) {
      const {name, description, activeBook} = club
      const clubThreads = club.threadIds.map(threadId => threads.filter(thread=> thread.id === threadId)).flat()

      return (
        <>
          <div className='Club-details'>
            <h1>{name}</h1>
            { this.renderModOptions(currentUser, clubId) }
            { this.renderMembershipButton(currentUser) }
            <p>{description}</p>
          </div>
          <ClubBook isbn={activeBook} />
          <ThreadList threads={clubThreads} club={club} currentUser={currentUser} />
        </>
      )
    }
  }

  render() {
    return (
      <div className='Club-container'>
          {this.renderClub()}
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