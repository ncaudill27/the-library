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

  // componentDidMount() {
  //   this.fetchBookInfo();
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.clubId !== this.props.clubId) this.setState({book: false}, this.fetchBookInfo);;
  // }

  fetchBookInfo = () => {
    const { activeBook } = this.props;
    const key = process.env.REACT_APP_GOOGLE_BOOKS_KEY;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${activeBook}&key=${key}`)
    .then( res => res.json() )
    .then( data => {
      this.setState({ book: data.items[0].volumeInfo })
    })
    .catch(errors => console.log(errors));
  }
  
  toggleModding = () => {
    this.setState( prevState => ({
      modding: !prevState.modding
    }));
  }

  toggleMembers = () => {
    this.setState( prevState => ({
      members: !prevState.members
    }));
  }

  closeMembers = () => {
    this.toggleModding();
    this.toggleMembers();
  }
  
  handleJoin = () => {
    const { id, memberJoinRequest} = this.props;
    const payload = {
      membership: {
        club_id: id
      }
    };

    memberJoinRequest(payload);
  }
  // currentUserIsMod = () => {
  //   const { currentUser, clubId, memberships } = this.props;
  //   const thisMembership = memberships.find( m => m.userId === currentUser.id && m.clubId === clubId ) ?? false;

  //   return thisMembership.isMod
  // }
  
  // currentUserIsMember = () => {
  //   const {currentUser, clubId, memberships } = this.props;
  //   const thisMembership = memberships.find( m => m.userId === currentUser.id && m.clubId === clubId );

  //   return !!thisMembership;
  // }


  handleLeave = () => {
    const {
      closeMembers,
      props: {
        id,
        memberLeaveRequest,
        currentUser,
        findMembershipId
      },
      state: {
        modding,
        members
      }
    } = this;

    const membershipId = findMembershipId({clubId: id, userId: currentUser.id});
    memberLeaveRequest(membershipId);
    if (modding && members) closeMembers();
  }

  renderMembershipButton = () => 
    this.props.currentUserIsMember
    ? <h3 id='leave' onClick={this.handleLeave}>Leave Club</h3>
    : <h3 id='join' onClick={this.handleJoin}>Join Club</h3>;

  renderModOptions = () => {
    if ( this.props.currentUserIsMod ) {
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
    let { members } = this.props;

    members = members.map( member => {
      return <div key={member.id} className='member'>
        <p key={member.name}>{member.username}</p>
        <button key={member.username} onClick={this.handleLeave}>remove</button>
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
        currentUser,
        clubsPending
      },
      state: {
        book
      },
      renderMembershipButton,
      currentUserIsMod
    } = this;

    const {name, description, activeBook} = club
    const clubThreads = club.threadIds.map( threadId => threads.find(thread=> thread.id === threadId) )
    return (
      <>
      </>
    )
  }

  render() {
    const {
      props: {
        name,
        description,
        currentUserIsMod,
        currentUser,
        clubsPending,
        userPending,
        threads,
        memberships
      },
      state: {
        book
      },
      renderMembershipButton
    } = this;

    console.log(this.props);
    let {title, authors, averageRating, imageLinks} = book;
    
    return (
      <div className='Club-container'>
          { currentUserIsMod ? this.renderModOptions() : null }
          <div className='Club-details'>
          <h1>{name}</h1>
          { currentUser ? renderMembershipButton() : null }
          <p>{description}</p>
        </div>
        { book ? <ClubBook title={title} authors={authors} averageRating={averageRating} imageLinks={imageLinks} /> : null }
        <ThreadList threads={threads} currentUser={currentUser} mod={currentUserIsMod} />
          {/* {
            this.state.members
            ? this.renderCurrentMembers()
            : !clubsPending && !threadsPending && !userPending && memberships.length && club
              ? this.renderClub(club)
              : null
          } */}
      </div>
    );
  }
}

const mapStateToProps = ({clubs, threads, users}) => ({
  // clubs: clubs.data,
  // threadsPending: threads.pending,
  // users: users.data,
  // memberships: users.memberships,
  // userPending: users.pending
});

export default connect(mapStateToProps, { memberJoinRequest, memberLeaveRequest })(ClubContainer);