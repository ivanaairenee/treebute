import React from 'react';
import { CardTaskElement } from './style';
import TaskWeight from 'components/TaskWeight'
export default class CardTask extends React.Component {

  render() {
    return(
      <CardTaskElement>
        <div className='taskName'>
          {this.props.taskName}
          {
            this.props.status === "Complete" ?
            <div className='status complete'>
              Complete
            </div>
            :
            <div className='status incomplete'>
              Incomplete
            </div>
          }
        </div>
        <div className="assignee">{this.props.assignee}</div>
        <div className="weight">
          Weight:
        </div>
        <TaskWeight id={this.props.id} weight={this.props.weight} setCardWeight={this.props.setCardWeight} />
      </CardTaskElement>
    )
  }
}
