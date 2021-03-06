import React from 'react';
import axios from 'axios';
import ExampleComponent from 'components/ExampleComponent';
import CardTask from 'components/CardTask';
import Chart from 'components/Chart';
import { HomePageElement } from './style';

export default class HomePage extends React.Component {
  componentDidMount() {
    const boardId = localStorage.getItem("boardId");
    axios.get(`https://api.trello.com/1/boards/${boardId}/cards/?fields=badges,name&members=true&member_fields=fullName&badges=true`)
      .then(res => {
        const cards = res.data;
        const cardNames = [];
        const today = new Date();
        if (cards) {
          cards.map(card => cardNames.push({
            id: card.id,
            name: card.name,
            assignee: card.members[0],
            due: card.badges.due,
            status: card.badges.checkItems === card.badges.checkItemsChecked ? "Complete" : "Incomplete",
          }));
        }
        this.createCardWeights(cardNames);
        localStorage.setItem('cardNames', JSON.stringify(cardNames));
      })
  }

  createCardWeights(cardNames) {
    const cardWeights = localStorage.getItem('cardWeights') === null ? {} : JSON.parse(localStorage.getItem('cardWeights'));
    cardNames.map(card => {
      if (cardWeights[card.id] === undefined) {
        cardWeights[card.id] = 1;
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

  getListOfCards() {
    const cards = JSON.parse(localStorage.getItem("cardNames"));
    const weightDictionary = JSON.parse(localStorage.getItem("cardWeights"));
    let listOfCards;
    if (cards) {
      listOfCards = cards.map((card, index) => {
        const name = card.assignee ? card.assignee.fullName : "";
        const weight = weightDictionary[card.id];
        return (
          <CardTask
            key={index}
            id={card.id}
            due={card.due}
            taskName={card.name}
            assignee={name}
            status={card.status}
            weight={weight}
            setCardWeight={this.setCardWeight}
          />
        );
      });
    }
    return listOfCards;
  }

  render() {
    return (
      <HomePageElement>
        {this.getListOfCards()}
      </HomePageElement>
    );
  }
}
