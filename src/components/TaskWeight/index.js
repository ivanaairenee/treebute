import React from 'react';
import { TaskWeightElement } from './style';

export default class TaskWeight extends React.Component {

  render() {
    return(
      <TaskWeightElement>
          <div className='weight-container'>
            <button class='btn-min'>-</button>
            <input type='number' min='1' max='10'></input>
            <button class='btn-plus'>+</button>

          </div>
      </TaskWeightElement>
    )
  }
}
