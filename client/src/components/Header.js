import React from 'react';
import NavBar from './NavBar';
import NYTimesContainer from '../containers/NYTimesContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ClubList from './ClubList';

function Header() {
  return (
    <header className="Main-header">
      <Router>
          <>
            <NavBar />
            <Route exact path='/bestsellers' component={NYTimesContainer} />
            <Route exact path='/clubs' component={ClubList} />
          </>
      </Router>
    </header>);
}

export default Header;