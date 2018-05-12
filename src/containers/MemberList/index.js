import React from 'react';
import axios from 'axios';

export default class MemberList extends React.Component {
  componentDidMount() {
    const boardId = localStorage.getItem("boardId");
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
            weight: 0,
          }));
        }
        localStorage.setItem('cardNames', JSON.stringify(cardNames));
        if (localStorage.getItem('cardNames')) {
          console.log(JSON.parse(localStorage.getItem('cardNames')));
        }
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
          if (cardNames) {
              cardNames.map((card) => {
                  if (card.status === 'Complete') {
                      memberList.map((member) => {
                          if (card.assignee) {
                              if (member.id === card.assignee.id) {
                                  member.contributionPoints += card.weight;
                              }
                          }
                      })
                  }
              })
          }

          localStorage.setItem('memberList', JSON.stringify(memberList));
          if (localStorage.getItem('memberList')) {
            console.log(JSON.parse(localStorage.getItem('memberList')));
          }
      })
    })
  }
  render() {
    return (
        <div></div>
    );
  }
}