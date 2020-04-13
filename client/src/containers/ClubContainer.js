import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThreadList from '../components/ThreadList';

class ClubContainer extends Component {

  renderClub = (club, data) => {
    if (club && data) {
      const {name, description} = club
      const threads = club.threadIds.map(threadId => data.filter(thread=> thread.id === threadId)).flat()
      return (
        <>
          <h2>{name}</h2>
          <p>{description}</p>
          <ThreadList threads={threads} club={club} />
        </>
      )
    }
  }

  render() {
    const {threads: {data: threads, pending}, clubs, id, users, currentUser} = this.props
    const club = clubs.find(club => club.id === id);

    return (
      <div className='Club-container'>
        {pending === true ? <p>loading....</p> : this.renderClub(club, threads)}
      </div>
    )
  }
}

const mapStateToProps = ({users, threads}) => ({users, threads});

export default connect(mapStateToProps)(ClubContainer);