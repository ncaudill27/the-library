import React, { Component } from 'react';

class SidebarContainer extends Component {
  render() {
    return (
      <div className='sidebar'>
        <UserBox />
        <ClubList clubs={} styling='sidebar' />
      </div>
    );
  }
}

export default SidebarContainer;