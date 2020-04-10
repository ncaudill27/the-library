import React from 'react';
import './App.css';
import SidebarContainer from './containers/SideBarContainer';
import MainContainer from './containers/MainContainer';

function App() {
  return (
    <div className="App">
      <SidebarContainer />
      <MainContainer />
    </div>
  );
}

export default App;
