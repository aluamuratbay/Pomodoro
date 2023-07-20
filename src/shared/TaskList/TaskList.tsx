import './taskList.css';
import { Task } from './Task';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducer';
import { useEffect, useState } from 'react';

export interface ITaskList {
  id: string;
  name: string;
  amount: number;
  done: boolean;
  started: boolean;
  date: Date;
}

export function TaskList() {  
  const taskList: ITaskList[] = useSelector<RootState, ITaskList[]>(state => state.taskList);
  const timerState = useSelector<RootState, string>(state => state.timer.timerState);
  const time = useSelector<RootState, number>(state => state.timer.time);
  const ms = require('ms');
  const [totalTime, setTotalTime] = useState(ms('25m')); 

  useEffect(() => {
    let total  = 0;
    const currentTasks: ITaskList[] = taskList.filter(task => task.started === false);

    if(timerState === "Default") {
      for(const task of currentTasks) {
        if(currentTasks.indexOf(task) === 0) {
          total += ms('25m') * (task.amount - 1);
        } else {
          total += ms('25m') * task.amount;
        }
      }
      
      total += time;
    } else {
      for(const task of currentTasks) {
        total += ms('25m') * task.amount;
      }
    }

    setTotalTime(total);
  }, [taskList, timerState, time, ms])

  function formatTime(ms: number): string {
    let minutes = Math.floor(ms / 1000 / 60);

    if(minutes > 59) {
      minutes =  Math.floor(ms / 1000 / 60) % 60;
      const hours = Math.floor(ms / 1000 / 60 / 60);

      return `${hours} час ${minutes} мин`;
    } 

    return `${minutes} мин`;
  }
  
  return (
    <>
      {taskList.filter(task => task.started === false).length !== 0 && 
        <div className='listContainer'>
          <ul className='taskList'>
            {taskList.filter(task => task.started === false).map((task: ITaskList) => {
              return (
                <Task id={task.id} name={task.name} amount={task.amount} />
              )
            })}
          </ul>
        <span className='totalTime'> {formatTime(totalTime)} </span>
       </div>
      }
    </>
  );
}