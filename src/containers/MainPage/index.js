import React, { PropTypes } from 'react';
import axios from 'axios';
import ExampleComponent from 'components/ExampleComponent';
import { MainPageElement } from './style';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardId:"",
    }
  }

  handleChange(value){
    this.setState({ boardId: value });
  }

  onSubmit() {
    return new Promise((resolve, reject) => {
      const boardId = this.state.boardId;
      localStorage.setItem("boardId", boardId);
      axios.get(`https://api.trello.com/1/boards/${boardId}/`)
      .then(res => {
        localStorage.setItem("boardName", res.data.name);
      })
      resolve();
    }).then(() => {
      window.location = "/tasks";
    })
    
  }
  render() {
    return (
      <MainPageElement>
        <h1 className="title">TREE<span className="bold">BUTE</span></h1>
        <div className="tagline">CONTRIBUTIONS MADE EASY</div>
        <div className="inputProject">Input project's Trello Board ID
          <input type="text" onChange={(evt) => this.handleChange(evt.target.value)} />
          <button className="button" onClick={() => this.onSubmit()}>GO</button>
        </div>
      </MainPageElement>
    );
  }
}