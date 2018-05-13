import React from 'react';
import axios from 'axios';
import { ProfileElement } from './style';
import Chart from 'components/ChartMember'

export default class Profile extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("refreshprofile") === null) {
        localStorage.setItem("refreshprofile", "true");
        setTimeout(() => window.location.reload(), 1000);
    }

    window.addEventListener('beforeunload', this.componentCleanup);
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
          if (localStorage.getItem('memberList')) {
            console.log(JSON.parse(localStorage.getItem('memberList')));
          }
      })
    })
  }
  componentCleanup() {
    localStorage.removeItem("refreshprofile");
  }

  componentWillUnmount() {
    localStorage.removeItem("refreshprofile");
  }
  render() {
    const members = JSON.parse(localStorage.getItem("memberList"));
    const member = members ? members[0] : null;
    return(
      members &&
      <ProfileElement>
        <img src={member.avatarUrl} />
        <h3>{member.fullName}</h3>
        <h2>Total Contribution Points:</h2>
        <h1>{member.contributionPoints}</h1>
        <Chart />
      </ProfileElement>
    );
  }
}