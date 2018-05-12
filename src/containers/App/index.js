/* eslint-disable */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import MainPage from 'containers/MainPage';
import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage';
import MemberList from 'containers/MemberList';
import RatingMainpage from 'containers/RatingMainpage';
import RateAndFeedback from 'containers/RateAndFeedback';

import Navigation from 'components/Navigation';
import TopBar from 'components/TopBar';

import { AppElement } from './style';
import { theme } from './theme';

export default class App extends React.Component {
  getCurrentActive() {
    if (window.location.pathname.toLowerCase().indexOf('tasks') >= 0) {
      return 'tasks';
    } else if (window.location.pathname.toLowerCase().indexOf('members') >= 0) {
      return 'members';
    } else if (window.location.pathname.toLowerCase().indexOf('profile') >= 0) {
      return 'profile';
    } else if (window.location.pathname.toLowerCase().indexOf('home') >= 0) {
      return 'home';
    }
    return "main";
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        {
          this.getCurrentActive() === "main" ? <MainPage /> :
            <AppElement>
              <TopBar />
              <div className="container">
                <div className="navigation">
                  <Navigation currentActive={this.getCurrentActive()}/>
                </div>
                <div className="content">
                  <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/tasks" component={HomePage} />
                    <Route exact path="/members" component={MemberList} />
                    <Route exact path="/rating" component={RatingMainpage} />
                    <Route exact path="/rating/:idMember" component={RateAndFeedback} />
                    <Route component={NotFoundPage} />
                  </Switch>
                </div>
              </div>
            </AppElement>
        }
      </ThemeProvider>
    );
  }
}