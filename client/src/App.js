import React from 'react';
import './App.css';
import SidebarContainer from './containers/SideBarContainer';
import MainContainer from './containers/MainContainer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <SidebarContainer />
      <MainContainer />
    </div>
  );
}

export default App;
