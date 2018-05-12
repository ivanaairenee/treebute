import React from 'react';
import { ProfileElement } from './style';
import Chart from 'components/Chart'

export default class Profile extends React.Component {
  render() {
    const members = JSON.parse(localStorage.getItem("memberList"));
    const member = members[0];
    return(
      <ProfileElement>
        <img src={member.avatarUrl} />
        <h3>{member.fullName}</h3>
        <h2>Total Contributions Points:</h2>
        <h1>{member.contributionPoints}</h1>
        <Chart />
      </ProfileElement>
    );
  }
}