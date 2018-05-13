import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { RateFeedbackElement } from './style';

export default class RateAndFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: {},
      feedback: {},
      memberList: [],
      memberRatingFeedback: [],
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
        const storageMemberRatingFeedback = JSON.parse(localStorage.getItem('memberRatingFeedback'));
        this.setState({ memberList: storageMemberList, memberRatingFeedback: storageMemberRatingFeedback, });
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

  handleChangeRating(idEvaluatedMember, value) {
    this.state.rating.idEvaluatedMember = value;
  }

  handleChangeFeedback(idEvaluatedMember, value) {
    this.state.feedback.idEvaluatedMember = value;
  }

  onSubmit(idEvaluatedMember) {
    this.setMemberRatingFeedback(this.props.match.params.idMember, idEvaluatedMember, this.state.rating.idEvaluatedMember, this.state.feedback.idEvaluatedMember)
    swal("Success", "Rating and Review successfully submitted", "success")
    .then(() => window.location.reload());
  }

  render() {
    const rateCards = [];
    this.state.memberList.map(member => {
      if (member.id !== this.props.match.params.idMember) {
        rateCards.push(
          <div className="card">
            <img src={member.avatarUrl} /><br />
            <h5>{member.fullName}</h5><br />
            Rating (1-5)
            <input ref="rating" type='number' min="1" max="5" onChange={(evt) => this.handleChangeRating(member.id, evt.target.value)}></input><br />
            Feedback
            <input ref="feedback" type='text' onChange={(evt) => this.handleChangeFeedback(member.id, evt.target.value)}></input><br />
            <button onClick={() => this.onSubmit(member.id)}>Submit</button><br />
          </div>
        );
      }
    });

    return (
      <RateFeedbackElement>
        <h1>Rate and Feedback</h1>
        <div className="cardContainer">
          {rateCards}
        </div>
      </RateFeedbackElement>
    );
  }
}