import React, { Component } from 'react';
import UserBox from '../components/UserBox';
import { connect } from 'react-redux';

class SidebarContainer extends Component {
  render() {
    const userId = localStorage.getItem('currentUser')
    const user = this.props.users.data.find(user => user.id == userId)  
    return (
      <div className='Sidebar'>
        { user ? <UserBox user={user} /> : null}
        {/* <ClubList clubs={} styling='sidebar' /> */}
      </div>
    );
  }
}

const mapStateToProps = ({users}) => ({users});

export default connect(mapStateToProps)(SidebarContainer);