import React, { Component } from 'react';
import UserBox from '../components/UserBox';

class SidebarContainer extends Component {
  render() {
    return (
      <div className='Sidebar'>
        <UserBox />
        {/* <ClubList clubs={} styling='sidebar' /> */}
      </div>
    );
  }
}

export default SidebarContainer;