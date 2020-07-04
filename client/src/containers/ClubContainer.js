import React, { Component } from 'react';
import { connect } from 'react-redux';
import { memberJoinRequest, memberLeaveRequest } from '../actions/users';
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

  //! CLEARED
  currentUserIsMod = () => {
    const { currentUser, clubId, memberships } = this.props;
    const thisMembership = memberships.find( m => m.userId === currentUser.id && m.clubId === clubId ) ?? false;

    return thisMembership.isMod
  }
  
  //! CLEARED
  currentUserIsMember = () => {
    const {currentUser, clubId, memberships } = this.props;
    const thisMembership = memberships.find( m => m.userId === currentUser.id && m.clubId === clubId );

    return !!thisMembership;
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

  handleLeave = member => {
    const {
      closeMembers,
      props: {
        clubId,
        memberLeaveRequest,
        memberships
      }
    } = this;

    const thisMembership = memberships.find( m => m.userId === member.id && m.clubId === clubId );

    memberLeaveRequest(thisMembership.id);
    closeMembers();
  }

  renderMembershipButton = currentUser => 
    this.currentUserIsMember()
    ? <h3 id='leave' onClick={ () => this.handleLeave(currentUser) }>Leave Club</h3>
    : <h3 id='join' onClick={this.handleJoin}>Join Club</h3>;

  renderModOptions = () => {
    if ( this.currentUserIsMod() ) {
    return  <div onClick={this.toggleModding} className='mod'>
              <button onClick={this.toggleMembers}>Current Members</button>
            </div>;
    };
  }

  renderCurrentMembers = () => {
    let { users, clubId, memberships } = this.props;
    const clubMemberships = memberships.filter( m => m.clubId === clubId );

    users = clubMemberships.map( m => {
      return users.find( u => u.id === m.userId );
    });
    console.log(users);

    const members = users.map( member => {
      return <div key={member.id} className='member'>
        <p key={member.name}>{member.username}</p>
        <button key={member.username} onClick={() => this.handleLeave(member)}>remove</button>
      </div>
    });
    
    return  <div className='members'>
              <button onClick={this.closeMembers}>X</button>
              {members}
            </div>
  }
  

  renderClub = () => {
    const {
      props: {
        clubId,
        clubs,
        threads,
        currentUser,
        memberships
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
            { currentUser && memberships !== [] ? renderMembershipButton(currentUser) : null }
            <p>{description}</p>
          </div>
          <ClubBook isbn={activeBook} />
          <ThreadList threads={clubThreads} club={club} currentUser={currentUser} />
        </>
      )
    }
  }

  render() {
    const { memberships } = this.props;
    // if (memberships.length) console.log(memberships);
    
    return (
      <div className='Club-container'>
          { memberships.length ? this.renderModOptions() : null }
          { this.state.members ? this.renderCurrentMembers() : this.renderClub() }
      </div>
    )
  }
}

const mapStateToProps = ({clubs, threads, users}) => ({
  clubs: clubs.data,
  clubsPending: clubs.pending,
  threads: threads.data,
  threadsPending: threads.pending,
  currentUser: users.currentUser,
  users: users.data,
  memberships: users.memberships
});

export default connect(mapStateToProps, { memberJoinRequest, memberLeaveRequest })(ClubContainer);