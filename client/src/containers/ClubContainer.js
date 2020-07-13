import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { memberJoinRequest, memberLeaveRequest } from '../actions/users';
import ThreadList from '../components/ThreadList';
import ClubBook from '../components/ClubBook';
import { NavLink } from 'react-router-dom';

class ClubContainer extends PureComponent {

  componentDidMount() {
    this.fetchBookInfo();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.id !== this.props.id) this.fetchBookInfo();
  }

  componentWillUnmount() {
    if (this.props.modding) this.props.toggleModding();
  }

  fetchBookInfo = () => {
    const { activeBook } = this.props;
    this.props.fetchBookInfo(activeBook);
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
      id,
      memberLeaveRequest,
      currentUser,
      findMembershipId,
      modding,
      toggleModding
    } = this.props;

    const membershipId = findMembershipId({clubId: id, userId: currentUser.id});
    memberLeaveRequest(membershipId);
    if (modding) toggleModding();
  }

  renderMembershipButton = () => 
    this.props.currentUserIsMember
    ? <h3 id='leave' onClick={this.handleLeave}>Leave Club</h3>
    : <h3 id='join' onClick={this.handleJoin}>Join Club</h3>;

  renderModOptions = () => 
    <div className='mod'>
      <button onClick={this.props.toggleModding}>Current members</button>
      <br />
      <button><NavLink to='/avatar-selection' exact>
        Choose new avatar
      </NavLink></button>
      <br />
      <button><NavLink to='/bestsellers' exact>Set new book</NavLink></button>
    </div>;

  renderCurrentMembers = () => {
    let { members, toggleModding } = this.props;

    members = members.map( member => {
      return <div key={member.id} className='member'>
        <p key={member.name}>{member.username}
          <button key={member.username} onClick={this.handleLeave}>remove</button>
        </p>
      </div>
    });
    
    return  <div className='members'>
              <button onClick={toggleModding}>CLOSE</button>
              {members}
            </div>;
  }

  render() {
    const {
      props: {
        id,
        name,
        activeBook,
        description,
        currentUserIsMod,
        currentUser,
        threads,
        modding,
        book
      },
      renderMembershipButton,
      renderModOptions,
      renderCurrentMembers
    } = this;

    const isbn = RegExp(activeBook);
    console.log(this.props);

    return (
      <div className='Club-container'>
        { currentUserIsMod ? renderModOptions() : null }
        { modding ? renderCurrentMembers() : null }
        <div className='Club-details'>
          <h1>{name}</h1>
          { currentUser ? renderMembershipButton() : null }
          <p>{description}</p>
        </div>
        { isbn.test(book.infoLink) ? <ClubBook {...book} /> : null }
        <ThreadList threads={threads} clubId={id} currentUser={currentUser} currentUserIsMod={currentUserIsMod} />
      </div>
    );
  }
}

export default connect( null, { memberJoinRequest, memberLeaveRequest })(ClubContainer);