import React from 'react';
import axios from 'axios';

export default class RatingMainpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberList: [],
    }
  }

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
      }).then(() => {
        const storageMemberList = JSON.parse(localStorage.getItem('memberList'));
        this.setState({ memberList: storageMemberList, });
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

  handleRateAndFeedback(idMember) {
    window.location = '/rating/' + idMember;
  }

  render() {
    const memberCards = [];
    this.state.memberList.map(member => {
      memberCards.push(
        <div>
          <img src={member.avatarUrl} /><br />
          <h5>Name: {member.fullName}</h5><br />
          <button onClick={() => this.handleRateAndFeedback(member.id)}>Mock Login</button><br />
        </div>
      );
    });

    return (
      <div>
        <h3>Rating</h3>
        { memberCards }
      </div>
    );
  }
}