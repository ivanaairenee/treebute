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
          }));
        }
        this.createCardWeights(cardNames);
        localStorage.setItem('cardNames', JSON.stringify(cardNames));
        if (localStorage.getItem('cardNames')) {
          console.log(JSON.parse(localStorage.getItem('cardNames')));
        }
      })
  }

  createCardWeights(cardNames) {
    const cardWeights = localStorage.getItem('cardWeights') === null ? {} : JSON.parse(localStorage.getItem('cardWeights'));
    cardNames.map(card => {
      if (cardWeights[card.id] === undefined) {
        cardWeights[card.id] = 0;
      }
    });
    localStorage.setItem('cardWeights', JSON.stringify(cardWeights));
  }

  incDecCardWeight(idCard, boolInc) {
    const cardNames = JSON.parse(localStorage.getItem('cardNames'));
    const cardWeights = JSON.parse(localStorage.getItem('cardWeights'));
    if (cardNames && cardWeights) {
      cardNames.map(card => {
        if (card.id === idCard) {
          if (boolInc) {
            cardWeights[idCard]++;
          } else {
            cardWeights[idCard]--;
          }
        }
      })
      localStorage.setItem('cardWeights', JSON.stringify(cardWeights));
    }
  }

  setCardWeight(idCard, value) {
    const cardNames = JSON.parse(localStorage.getItem('cardNames'));
    const cardWeights = JSON.parse(localStorage.getItem('cardWeights'));
    if (cardNames && cardWeights) {
      cardNames.map(card => {
        if (card.id === idCard) {
          cardWeights[idCard] = value;
        }
      })
      localStorage.setItem('cardWeights', JSON.stringify(cardWeights));
    }
  }

  render() {
    return (
      <HomePageElement>
        <i className="fas fa-tree" />
      </HomePageElement>
    );
  }
}