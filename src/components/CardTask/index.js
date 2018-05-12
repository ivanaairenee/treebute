import React from 'react';
import { CardTaskElement } from './style';
import TaskWeight from 'components/TaskWeight'
export default class CardTask extends React.Component {

  render() {
    return(
      <CardTaskElement>
        <div className='container'>
          <div className='taskName'>
            {this.props.taskName}
          </div>
          <div className='taskDetail'>

            <div className='assignee label'>
              Assignee:<span className='content'>{this.props.assignee}</span>
            </div>

            <div className='status label'>
              Status:
              {
                this.props.status === "Complete" ?
                <span className='complete content'>
                  Complete
                </span>
                :
                <span className='incomplete content'>
                  Incomplete
                </span>
              }
            </div>

            <div className='weight label'>
              Weight:
            </div>
            <TaskWeight/>
          </div>
        </div>
      </CardTaskElement>
    )
  }
}

//set props for testing
CardTask.defaultProps = {
  taskName: "API Integration",
  assignee: "Justin Sung",
  status: "Incomplete"
}
