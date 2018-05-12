import React from 'react';
import { CardTaskElement } from './style';
import TaskWeight from 'components/TaskWeight'
export default class CardTask extends React.Component {
  formattedDate(dateString) {
    const d = new Date(dateString);
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}/${month}/${year}`;
  }
  render() {
    const today = new Date();
    const due = new Date(this.props.due);
    const pastDue = due.getTime() < today ? "True" : "False";
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
        <div className={pastDue === "True" ? "date pastDue" : "date"}>{this.formattedDate(due)}</div>
        <div className="assignee">{this.props.assignee}</div>
        <div className="weight">
          Weight:
        </div>
        <TaskWeight id={this.props.id} weight={this.props.weight} setCardWeight={this.props.setCardWeight} />
      </CardTaskElement>
    )
  }
}