import './timer.css';
import { useDispatch, useSelector } from 'react-redux';
import { TimerBody } from './TimerBody';
import { TimerControl } from './TimerControl';
import { TimerHeader } from './TimerHeader';
import { IData, ITimer, IWeekStats, RootState, addLastWeek, addStatisticsData, addThisWeek, addTwoWeeksAgo, clearData, updateTime, updateTimerState } from '../../reducer';
import { ITaskList } from '../TaskList';
import { useEffect, useState } from 'react';
import { SettingsIcon } from '../Icons';
import { createPortal } from 'react-dom';
import { Settings } from './Settings';

export const node = document.getElementById('root') as HTMLElement;

export function Timer() {
  const ms = require("ms");
  const moment = require('moment');
  const timer = useSelector<RootState, ITimer>(state => state.timer);
  const taskList = useSelector<RootState, ITaskList[]>(state => state.taskList);
  const data = useSelector<RootState, IData>(state => state.data);
  const dispatch = useDispatch();
  let currentTask = taskList.filter(task => task.done === false)[0];
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const statisticsData = useSelector<RootState, IWeekStats[]>(state => state.statisticsData);

  useEffect(() => {
    if(currentTask) { 
      dispatch(updateTimerState('Default'));
    } else if(!currentTask) {
      dispatch(updateTimerState('Disabled'));
    }
  }, [currentTask, dispatch]);

  useEffect(() => {
    if(timer.tomatoDuration) {
      dispatch(updateTime(`${timer.tomatoDuration}m`));
    }
  }, [dispatch, timer.tomatoDuration])

  useEffect(() => {
    const thisDate = statisticsData.filter(day => day.date === moment(new Date()).format('LL'));
   
    if(thisDate.length === 0) {
      statisticsData.push({ 
        date: moment(new Date()).format('LL'), 
        data: {
          tomatoCount: 0,
          workTime: ms('0'),
          pauseTime: ms('0'),
          stopCount: 0,
        } 
      });

      dispatch(clearData());
    }
  }, [statisticsData, dispatch, moment, ms]);

  useEffect(() => {
    dispatch(addStatisticsData(moment(new Date()).format('LL'), data));
  }, [dispatch, moment, data]);

  useEffect(() => {
    for(let i = 0; i < statisticsData.length; i++) {
      dispatch(addThisWeek(statisticsData[i].date, statisticsData[i].data));
      dispatch(addLastWeek(statisticsData[i].date, statisticsData[i].data));
      dispatch(addTwoWeeksAgo(statisticsData[i].date, statisticsData[i].data));
    } 
  }, [statisticsData, dispatch]);

  return (
    <div className={`timer ${timer.timerState}`}>
      <button className='settingsBtn' onClick={() => setIsSettingsOpen(true)}>
        <SettingsIcon className='settingsIcon' />
      </button>

      <TimerHeader 
        name={currentTask ? currentTask.name : 'Добавьте задачку'} 
        timerState={timer.timerState} />
      <TimerBody 
        name={currentTask ? currentTask.name : 'Добавьте задачку'} 
        timerState={timer.timerState} />
      <TimerControl 
        id={currentTask ? currentTask.id : ''} 
        amount={currentTask ? currentTask.amount : 1}
        started={currentTask ? currentTask.started : false}
        timerState={timer.timerState} 
        taskList={taskList} />

      {createPortal ((
        <Settings isOpen={ isSettingsOpen } setIsOpen={ setIsSettingsOpen } />
      ), node)}  
    </div>
  )
}