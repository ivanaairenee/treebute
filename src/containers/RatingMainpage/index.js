import React from 'react';
import axios from 'axios';

export default class RatingMainpage extends React.Component {
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
                                  member.contributionPoints += cardWeights[card.id];
                              }
                          }
                      })
                  }
              })
          }

          this.createMemberRatingFeedback(memberList);

          localStorage.setItem('memberList', JSON.stringify(memberList));
      })
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

  createMemberRatingFeedback(memberList) {
    const memberRatingFeedback = localStorage.getItem('memberRatingFeedback') === null ? {} : JSON.parse(localStorage.getItem('memberRatingFeedback'));
    memberList.map(member => {
      memberList.map(evaluatedMember => {
        if ((member !== evaluatedMember) && (memberRatingFeedback[member.id] === undefined)) {
          memberRatingFeedback[member.id] = {};
        }

        if (((member !== evaluatedMember)) && (memberRatingFeedback[member.id][evaluatedMember.id] === undefined)) {
          memberRatingFeedback[member.id][evaluatedMember.id] = {};
          memberRatingFeedback[member.id][evaluatedMember.id]['rating'] = 0;
          memberRatingFeedback[member.id][evaluatedMember.id]['feedback'] = '';
        }
      })
    });
    localStorage.setItem('memberRatingFeedback', JSON.stringify(memberRatingFeedback));
  }

  setMemberRatingFeedback(idMember, idEvaluatedMember, rating, feedback) {
    const memberRatingFeedback = JSON.parse(localStorage.getItem('memberRatingFeedback'));
    if (memberRatingFeedback[idMember][idEvaluatedMember] !== undefined) {
      memberRatingFeedback[idMember][idEvaluatedMember]['rating'] = rating;
      memberRatingFeedback[idMember][idEvaluatedMember]['feedback'] = feedback;
    }
    localStorage.setItem('memberRatingFeedback', JSON.stringify(memberRatingFeedback));
  }

  handleRateAndFeedback(idMember) {
    window.location = '/rating/${idMember}';
  }

  createMemberCards = () => {
    const memberList = JSON.parse(localStorage.getItem('memberRatingFeedback'));
    let memberCards = [];
    for (let i = 0; i < memberList.length; i++) {
      memberCards[i] = (<button onClick={() => this.handleRateAndFeedback(memberList[i].id)}>Name: {memberList[i].fullName}</button>);
    };
    console.log(memberCards);
    return memberCards;
  }

  

  render() {
    return (
        <div>
          <h1>Rating</h1>
          {}
        </div>
    );
  }
}