import React from 'react';
import { DashboardElement } from './style';
import Chart from 'components/Chart'
export default class Dashboard extends React.Component {

  getTotalProjectWeight() {
    const cardWeights = JSON.parse(localStorage.getItem('cardWeights'));
    const weightValues = Object.values(cardWeights);
    let total = 0;
    if (cardWeights) {
      weightValues.map(weight => {
        total += parseInt(weight);
      })
    }
    return total;
  }

  getCompletedProjectWeight() {
    const cardNames = JSON.parse(localStorage.getItem('cardNames'));
    const cardWeights = JSON.parse(localStorage.getItem('cardWeights'));
    let total = 0;
    if (cardNames) {
      cardNames.map(card => {
        if (card.status === "Complete") {
          total += parseInt(cardWeights[card.id]);
        }
      })
    }
    return total;
  }

  render() {
    return(
      <DashboardElement>
        <div className="chart">
          <Chart />
        </div>
        <h1 className="planned">Total Project Weight: {this.getTotalProjectWeight()}</h1>
        <h1 className="actual">Total Weight Completed: {this.getCompletedProjectWeight()}</h1>
        <h1 className="commit">Project's Github Contribution:</h1>
        <img class="github" src="http://ghchart.rshah.org/fabpot" alt="Project X's Github chart" />
      </DashboardElement>
    )
  }
}