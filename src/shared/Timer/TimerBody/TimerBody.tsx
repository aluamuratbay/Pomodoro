import './timerBody.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { ITaskList } from '../../TaskList';
import { formatMessage } from 'devextreme/localization';

interface ITimerBody {
  name: string;
  timerState: string;
}

export function TimerBody({ name, timerState }: ITimerBody) {
  const moment = require('moment');
  const taskList = useSelector<RootState, ITaskList[]>(state => state.taskList);
  const thisDayTasks = taskList.filter(task => moment(task.date).format('LL') === moment().format('LL'));
  const time = useSelector<RootState, number>(state => state.timer.time);
  let taskNumber = 1;

  for(const task of thisDayTasks) {
    if(task.name === name) {
      taskNumber = (thisDayTasks.indexOf(task) + 1);
    }
  }

  function formatTime(ms: number): string {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / 1000 / 60);

    let secToStr = seconds.toString();
    let minToStr = minutes.toString();

    if(seconds < 10) {
      secToStr = '0' + secToStr;
    }

    if(minutes < 10) {
      minToStr = '0' + minToStr;
    }

    return `${minToStr}:${secToStr}`;
  }

  return (
    <div className='timerBody'>
      <p className={`timerCounter ${timerState}`}>{ formatTime(time) }</p>
      <p className='taskNumber'>{ formatMessage('Task') } {taskNumber} - <span className='taskName'>{ name }</span></p>
    </div>
  )
}