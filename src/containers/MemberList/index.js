import React from 'react';
import axios from 'axios';
import CardMember from 'components/CardMember';
import { MemberListElement } from './style';

export default class MemberList extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("refresh") === null) {
        localStorage.setItem("refresh", "true");
        setTimeout(() => window.location.reload(), 1000);
    }

    window.addEventListener('beforeunload', this.componentCleanup);
    const boardId = localStorage.getItem("boardId");
    const that = this;
    axios.get(`https://api.trello.com/1/boards/${boardId}/cards/?fields=badges,name&members=true&member_fields=fullName&badges=true`)
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
      }).then(() => {
      axios.get(`https://api.trello.com/1/boards/${boardId}/members/?fields=avatarUrl,fullName`)
        .then(res => {
          const members = res.data;
          const memberList = [];
          if (members) {
            members.map(member => memberList.push({
              id: member.id,
              avatarUrl: member.avatarUrl + '/170.png',
              fullName: member.fullName,
              contributionPoints: 0
            }));
          }

          const cardNames = JSON.parse(localStorage.getItem('cardNames'));
          const cardWeights = JSON.parse(localStorage.getItem('cardWeights'));
          if (cardNames) {
              cardNames.map((card) => {
                  if (card.status === 'Complete') {
                      memberList.map((member) => {
                          if (card.assignee) {
                              if (member.id === card.assignee.id) {
                                  member.contributionPoints += parseInt(cardWeights[card.id]);
                              }
                          }
                      })
                  }
              })
          }
          localStorage.setItem('memberList', JSON.stringify(memberList));
      })
    })
  }
  componentCleanup() {
    localStorage.removeItem("refresh");
  }

  componentWillUnmount() {
    localStorage.removeItem("refresh");
  }

  createCardWeights(cardNames) {
    const cardWeights = localStorage.getItem('cardWeights') === null ? {} : JSON.parse(localStorage.getItem('cardWeights'));
    cardNames.map(card => {
      if (cardWeights[card.id] === undefined) {
        cardWeights[card.id] = 0;
      }
    });
    localStorage.setItem('cardWeights', JSON.stringify(cardWeights));
    this.forceUpdate();
  }

  getListOfCards() {
    const members = JSON.parse(localStorage.getItem("memberList"));
    let listOfCards;
    if (members) {
      listOfCards = members.map((member, index) => {
        return (
          <CardMember
            key={index}
            name={member.fullName}
            avatar={member.avatarUrl}
            contributionPoints={member.contributionPoints}
          />
        );
      });
    }
    return listOfCards;
  }

  render() {
    return (
        <MemberListElement>
          {this.getListOfCards()}
        </MemberListElement>
    );
  }
}
