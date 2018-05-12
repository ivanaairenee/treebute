/* eslint-disable */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import MainPage from 'containers/MainPage';
import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage';
import MemberList from 'containers/MemberList';

import { theme } from './theme';

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/tasks" component={HomePage} />
          <Route exact path="/members" component={MemberList} />
          <Route component={NotFoundPage} />
        </Switch>
      </ThemeProvider>
    );
  }
}