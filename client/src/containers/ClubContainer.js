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
  }

  componentDidMount() {
    this.fetchBookInfo();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.id !== this.props.id) this.fetchBookInfo();
  }

  fetchBookInfo = () => {
    const { activeBook } = this.props;
    this.props.fetchBookInfo(activeBook);
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
    const { id, memberJoinRequest } = this.props;
    const payload = {
      membership: {
        club_id: id
      }
    };

    memberJoinRequest(payload);
  }

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

  render() {
    const {
      props: {
        id,
        name,
        description,
        currentUserIsMod,
        currentUser,
        threads,
        book
      },
      state: {
        modding
      },
      renderMembershipButton,
      renderModOptions,
      renderCurrentMembers
    } = this;

    console.log(this.props);
    let {title, authors, averageRating, imageLinks} = book;
    
    return (
      <div className='Club-container'>
        { currentUserIsMod ? renderModOptions() : null }
        <div className='Club-details'>
          <h1>{name}</h1>
          { currentUser ? renderMembershipButton() : null }
          <p>{description}</p>
        </div>
        { book ? <ClubBook title={title} authors={authors} averageRating={averageRating} imageLinks={imageLinks} /> : null }
        { modding ? renderCurrentMembers() : null }
        <ThreadList threads={threads} clubId={id} currentUser={currentUser} currentUserIsMod={currentUserIsMod} />
      </div>
    );
  }
}

export default connect( null, { memberJoinRequest, memberLeaveRequest })(ClubContainer);