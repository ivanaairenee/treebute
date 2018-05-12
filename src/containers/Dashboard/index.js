import React from 'react';
import { DashboardElement } from './style';
import Chart from 'components/Chart'
export default class Dashboard extends React.Component {

  render() {
    return(
      <DashboardElement>
        <div className="chart">
          <Chart />
        </div>
      </DashboardElement>
    )
  }
}