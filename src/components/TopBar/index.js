import React from 'react';
import { TopBarElement } from './style';

export default class TopBar extends React.Component {
  render() {
    const boardName = localStorage.getItem("boardName");
    return (
      <TopBarElement>
        <span className="title">{boardName}</span>
      </TopBarElement>
    );
  }
}