import React from 'react';
import {Line as LineChart} from 'react-chartjs';

function chartData() {
  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept'],
    datasets: [
      {
        label: 'Contribution point',
        fillColor: 'rgba(220,220,220,0)',
        strokeColor: '#4E6692',
        pointColor: '#22BD9E',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [5, 10, 20, 22, 30],
      },
    ]
  }
}

const options = {
  scaleShowGridLines: true,
  scaleGridLineColor: 'rgba(0,0,0,.05)',
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  animation: false,
  legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
}

const styles = {
  graphContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px',
  }
}

class LineChartExample extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: chartData()
    }
  }

  render() {
    return (
      <div style={styles.graphContainer}>
        <LineChart data={this.state.data}
          options={options}
          width="600" height="250"/>
      </div>
    )
  }
}

export default LineChartExample;
