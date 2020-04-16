import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThreadList from '../components/ThreadList';

class ClubContainer extends Component {

  renderClub = (club, threads, currentUser) => {
    if (club && threads) {
      const {name, description} = club
      const clubThreads = club.threadIds.map(threadId => threads.filter(thread=> thread.id === threadId)).flat()
      return (
        <>
          <div className='Club-details'>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
          <ThreadList threads={clubThreads} club={club} currentUser={currentUser} />
        </>
      )
    }
  }

  render() {
    const {clubId, clubs, threads, threadsPending, currentUser} = this.props
    const club = clubs.find(club => club.id === clubId);

    return (
      <div className='Club-container'>
        {threadsPending === true ? <p>loading....</p> : this.renderClub(club, threads, currentUser)}
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

export default connect(mapStateToProps)(ClubContainer);