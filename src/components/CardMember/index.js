import React from 'react';
import { CardMemberElement } from './style';
export default class CardMember extends React.Component {
  render() {
    console.log(this.props.contributionPoints.toString());
    return(
      <CardMemberElement>
        <img src={this.props.avatar}></img>
        <div className='name'>{this.props.name}</div>
        <div className='cp-label'>Total Contribution Points:</div>
        <div className='cp'>{this.props.contributionPoints}</div>
      </CardMemberElement>
    )
  }
}
