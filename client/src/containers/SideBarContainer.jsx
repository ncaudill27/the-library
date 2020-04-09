import React, { Component } from 'react';

class SidebarContainer extends Component {
  render() {
    return (
      <div className='container-sidebar'>
        <UserBox />
        <ClubList clubs={} />
      </div>
    );
  }
}

export default SidebarContainer;