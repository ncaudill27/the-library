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
          <h2>{name}</h2>
          <p>{description}</p>
          <ThreadList threads={clubThreads} club={club} currentUser={currentUser} />
        </>
      )
    }
  }

  render() {
    const {threads: {data: threads, pending}, clubs, id, currentUser} = this.props
    const club = clubs.find(club => club.id === id);

    return (
      <div className='Club-container'>
        {pending === true ? <p>loading....</p> : this.renderClub(club, threads, currentUser)}
      </div>
    )
  }
}

const mapStateToProps = ({threads}) => ({threads});

export default connect(mapStateToProps)(ClubContainer);