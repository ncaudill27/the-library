import React, { Component } from 'react';
import { connect } from 'react-redux';
import { memberJoinRequest, memberLeaveRequest } from '../actions/users';
import ThreadList from '../components/ThreadList';
import ClubBook from '../components/ClubBook';
import { NavLink } from 'react-router-dom';

class ClubContainer extends Component {

  state = {
    modding: false,
    members: false,
    book: false
  }

  componentDidMount() {
    this.fetchBookInfo();
  }

  fetchBookInfo = () => {
    const { clubId, clubs } = this.props;
    const {activeBook} = clubs.find( c => c.id === clubId );

    const key = `${process.env.REACT_APP_GOOGLE_BOOKS_KEY}`
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${activeBook}&key=${key}`)
    .then( res => res.json() )
    .then( data => {
      this.setState({ book: data.items[0].volumeInfo })
    })
    .catch(errors => console.log(errors));
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

  currentUserIsMod = () => {
    const { currentUser, clubId, memberships } = this.props;
    const thisMembership = memberships.find( m => m.userId === currentUser.id && m.clubId === clubId ) ?? false;

    return thisMembership.isMod
  }
  
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
      },
      state: {
        modding,
        members
      }
    } = this;

    const thisMembership = memberships.find( m => m.userId === member.id && m.clubId === clubId );

    memberLeaveRequest(thisMembership.id);
    if (modding && members) closeMembers();
  }

  renderMembershipButton = currentUser => 
    this.currentUserIsMember()
    ? <h3 id='leave' onClick={ () => this.handleLeave(currentUser) }>Leave Club</h3>
    : <h3 id='join' onClick={this.handleJoin}>Join Club</h3>;

  renderModOptions = () => {
    if ( this.currentUserIsMod() ) {
    return  <div onClick={this.toggleModding} className='mod'>
              <button onClick={this.toggleMembers}>Current Members</button>
              <br />
              <button><NavLink to='/avatar-selection' exact>
                Choose New Avatar
              </NavLink></button>
            </div>;
    };
  }

  renderCurrentMembers = () => {
    let { users, clubId, memberships } = this.props;
    const clubMemberships = memberships.filter( m => m.clubId === clubId );

    users = clubMemberships.map( m => {
      return users.find( u => u.id === m.userId );
    });

    const members = users.map( member => {
      return <div key={member.id} className='member'>
        <p key={member.name}>{member.username}</p>
        <button key={member.username} onClick={() => this.handleLeave(member)}>remove</button>
      </div>
    });
    
    return  <div className='members'>
              <button onClick={this.closeMembers}>X</button>
              {members}
            </div>;
  }
  

  renderClub = club => {
    const { 
      props: {
        threads,
        currentUser 
      },
      state: {
        book
      },
      renderMembershipButton,
      currentUserIsMod
    } = this;

    const {name, description, activeBook} = club
    const clubThreads = club.threadIds.map( threadId => threads.find(thread=> thread.id === threadId) )
    let {title, authors, averageRating, imageLinks} = book;
    return (
      <>
        <div className='Club-details'>
          <h1>{name}</h1>
          { currentUser ? renderMembershipButton(currentUser) : null }
          <p>{description}</p>
        </div>
        { book ? <ClubBook title={title} authors={authors} averageRating={averageRating} imageLinks={imageLinks} /> : null }
        <ThreadList threads={clubThreads} club={club} currentUser={currentUser} mod={currentUserIsMod} />
      </>
    )
  }

  render() {
    const {
      props: {
        clubId,
        clubs,
        clubsPending,
        userPending,
        threadsPending,
        memberships
      },
      state: {
        book
      }
    } = this;

    let club;

    if (!clubsPending) club = clubs.find(club => club.id === clubId);
    
    return (
      <div className='Club-container'>
          { memberships.length ? this.renderModOptions() : null }
          {
            this.state.members
            ? this.renderCurrentMembers()
            : !clubsPending && !threadsPending && !userPending && memberships.length && club
              ? this.renderClub(club)
              : null
          }
      </div>
    );
  }
}

const mapStateToProps = ({clubs, threads, users}) => ({
  clubs: clubs.data,
  clubsPending: clubs.pending,
  threads: threads.data,
  threadsPending: threads.pending,
  currentUser: users.currentUser,
  users: users.data,
  memberships: users.memberships,
  userPending: users.pending
});

export default connect(mapStateToProps, { memberJoinRequest, memberLeaveRequest })(ClubContainer);