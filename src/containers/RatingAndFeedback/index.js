import React from 'react';
import axios from 'axios';

export default class MemberList extends React.Component {
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
      }).then(() => {
      axios.get(`https://api.trello.com/1/boards/q5x5LRZA/members/?fields=avatarUrl,fullName`)
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

  render() {
    return (
        <div>
          <button onClick={() => this.setMemberRatingFeedback('58ee272aebe5aa88726dda59', '5a9a7211e111abe37f3b3a9c', 9, 'ganteng bets')}>Aku ganteng</button>
        </div>
    );
  }
}