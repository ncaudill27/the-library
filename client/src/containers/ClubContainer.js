import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThreadList from '../components/ThreadList';

class ClubContainer extends Component {

  renderClub = club => {
    if (club) {
      const {name, description} = club
      const threads = this.findThreads(club);

      return (
        <>
          <h2>{name}</h2>
          <p>{description}</p>
          <ThreadList threads={threads} club={club} />
        </>
      )
    }
  }

  findThreads(club) {
    const clubThreads = [];
    const threadData = this.props.threads.data;

    for (let id in club.threadIds) {
      clubThreads.push(threadData.find(thread => thread.id === club.threadIds[id]))
    };
    return clubThreads;
  }
  
  render() {
    const club = this.props.clubs.find(club => club.id === this.props.id);
    
    return (
      <div className='Club-container'>
        {this.props.clubs.pending ? <p>loading....</p> : this.renderClub(club)}
      </div>
    )
  }
}

const mapStateToProps = ({users, threads}) => ({users, threads})

export default connect(mapStateToProps)(ClubContainer);