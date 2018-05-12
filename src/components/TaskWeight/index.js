import React from 'react';
import { TaskWeightElement } from './style';

export default class TaskWeight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: '',
    }
  }
  componentDidMount() {
    const weight = this.props.weight;
    this.setState({ weight: weight });
  }

  handleChange(value) {
    this.props.setCardWeight(this.props.id, value);
    this.setState({ weight: value })
  }
  render() {
    return(
      <TaskWeightElement>
        <input onChange={(evt) => this.handleChange(evt.target.value)} type="number" min="1" max="10" value={this.state.weight} />
      </TaskWeightElement>
    )
  }
}
