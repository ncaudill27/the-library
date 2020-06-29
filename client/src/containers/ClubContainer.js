import React, { Component } from 'react';
import { connect } from 'react-redux';
import { memberJoinRequest, memberLeaveRequest } from '../actions/clubs';
import ThreadList from '../components/ThreadList';
import ClubBook from '../components/ClubBook';

class ClubContainer extends Component {

  state = {
    modding: false,
    members: false
  }
  
  toggleModding = () => {
    this.setState(prevState => ({
      modding: !prevState.modding
    }));
  }

  toggleMembers = () => {
    this.setState(prevState => ({
      members: !prevState.members
    }));
  }

  closeMembers = () => {
    this.toggleModding();
    this.toggleMembers();
  }

  isMod = () => {
    const { currentUser, clubId } = this.props;
    return currentUser && currentUser.modClubIds.includes(clubId)
  }
  
  currentUserIsMember = () => {
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

  renderModOptions = () => {
    if ( this.isMod() ) {
    return  <div onClick={this.toggleModding} className='mod'>
              <button onClick={this.toggleMembers}>Current Members</button>
            </div>;
    };
  }

  renderCurrentMembers = () => {
    let { users, clubId } = this.props;
    users = users.filter( user => user.clubIds.includes(clubId));
    console.log(users);
    
    const members = users.map( member => {
      return <div className='member'><p key={member.id}>{member.username}</p><button>remove</button></div>
    });
    
    return <div className='members'>
      <button onClick={this.closeMembers}>X</button>
      {members}
    </div>
  }
  

  renderClub = () => {
    const {
      props: {
        clubId, clubs, threads, currentUser
      },
      renderMembershipButton
    } = this;
    const club = clubs.find(club => club.id === clubId);
    if (club && threads) {
      const {name, description, activeBook} = club
      const clubThreads = club.threadIds.map(threadId => threads.filter(thread=> thread.id === threadId)).flat()

      return (
        <>
          <div className='Club-details'>
            <h1>{name}</h1>
            { renderMembershipButton(currentUser) }
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
          { this.renderModOptions() }
          { this.state.members ? this.renderCurrentMembers() : this.renderClub() }
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
    currentUser: users.currentUser,
    users: users.data
  }
};

export default connect(mapStateToProps, { memberJoinRequest, memberLeaveRequest })(ClubContainer);