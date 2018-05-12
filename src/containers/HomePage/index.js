import React from 'react';
import axios from 'axios';
import ExampleComponent from 'components/ExampleComponent';
import { HomePageElement } from './style';

export default class HomePage extends React.Component {
  componentDidMount() {
    axios.get(`https://api.trello.com/1/boards/q5x5LRZA/cards/?fields=badges,name&members=true&member_fields=fullName&badges=true`)
      .then(res => {
        const cards = res.data;
        const cardNames = [];
        if (cards) {
          cards.map(card => cardNames.push({
            id: card.id,
            name: card.name,
            assignee: card.members[0],
            status: card.badges.checkItems === card.badges.checkItemsChecked ? "Complete" : "Incomplete",
            weight: 0,
          }));
        }
        localStorage.setItem('cardNames', JSON.stringify(cardNames));
        if (localStorage.getItem('cardNames')) {
          console.log(JSON.parse(localStorage.getItem('cardNames')));
        }
      })
  }
  render() {
    return (
      <HomePageElement>
        <i className="fas fa-tree" />
      </HomePageElement>
    );
  }
}