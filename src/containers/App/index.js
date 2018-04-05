import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import HomePage from '../HomePage';
import NotFoundPage from '../NotFoundPage';

import { theme } from './theme';

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </ThemeProvider>
    );
  }
}