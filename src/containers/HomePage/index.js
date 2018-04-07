import React from 'react';
import ExampleComponent from 'components/ExampleComponent';
import { HomePageElement } from './style';

export default class HomePage extends React.Component {
  render() {
    return (
      <HomePageElement>
        hello
        <ExampleComponent />
      </HomePageElement>
    );
  }
}