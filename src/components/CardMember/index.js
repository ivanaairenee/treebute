import React from 'react';
import { CardMemberElement } from './style';
export default class CardMember extends React.Component {
  render() {
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
