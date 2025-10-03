import './timerControl.css';
import { useDispatch, useSelector } from 'react-redux';
import { ITimer, RootState, increasePauseTime, increaseStopCount, increaseTomatoCount, increaseWorkTime, updateTask, updateTime, updateTimerState } from '../../../store/reducer';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Notification } from './Notification';
import { ITaskList } from '../../TaskList';
import sound from '../../../assests/timer-finish.mp3';
import { createPortal } from 'react-dom';
import { node } from '../../Timer';
import { formatMessage } from 'devextreme/localization';

interface ITimerControl {
  id: string;
  amount: number;
  started: boolean;
  timerState: string;
  taskList: ITaskList[];
}

export function TimerControl({ id, amount, started, timerState, taskList }: ITimerControl) {
  const dispatch = useDispatch();
  const timer = useSelector<RootState, ITimer>(state => state.timer);
  const tomatoCount = useSelector<RootState, number>(state => state.data.tomatoCount);
  const [primaryBtn, setPrimaryBtn] = useState('Start');
  const [secondaryBtn, setSecondaryBtn] = useState('Stop');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const interval = useRef<ReturnType<typeof setInterval>>();
  const pauseInterval = useRef<ReturnType<typeof setInterval>>();

  const startBreak = useCallback(() => {
    setPrimaryBtn('Pause');
    setSecondaryBtn('Skip');
    
    if((tomatoCount + 1) % (timer.breakFrequency) === 0) {
      dispatch(updateTime(`${timer.longBreak}m`));
    } else {
      dispatch(updateTime(`${timer.shortBreak}m`));
    }

    clearInterval(interval.current);
    interval.current = undefined;
      
    if(!interval.current) {
      interval.current = setInterval(() => {
        dispatch(updateTime('dec'));
      }, 1000);
    }
  }, [dispatch, tomatoCount, timer]);

  const resetTimer = useCallback(() => {
    setPrimaryBtn('Start');
    setSecondaryBtn('Stop');

    if(amount === 1 && started === true) dispatch(updateTask(id, 'done'));
    dispatch(updateTime(`${timer.tomatoDuration}m`));

    if(taskList.filter(task => task.done === false).length === 0) {
      dispatch(updateTimerState('Disabled'));
    } else {
      dispatch(updateTimerState('Default'));
    }
    
    clearInterval(interval.current);
    interval.current = undefined;  
  }, [dispatch, id, amount, started, taskList, timer.tomatoDuration]);

  function handlePrimeClick() {
    switch(timerState) {
      case 'Default': 
        dispatch(updateTimerState('Active'));
        setPrimaryBtn('Pause');
        setSecondaryBtn('Stop');

        if(amount > 1) { dispatch(updateTask(id, 'dec')); }
        else { dispatch(updateTask(id, 'started')); }

        if(!interval.current) {
          interval.current = setInterval(() => {
            dispatch(updateTime('dec'));
            dispatch(increaseWorkTime());
          }, 1000);
        }

        break;

      case 'Active': 
        if(primaryBtn === 'Pause') {
          setPrimaryBtn('Resume');
          setSecondaryBtn('Done');
          
          if(!pauseInterval.current) {
            pauseInterval.current = setInterval(() => {
              dispatch(increasePauseTime());
            }, 1000);
          }

          clearInterval(interval.current);
          interval.current = undefined;
        } else {
          setPrimaryBtn('Pause');
          setSecondaryBtn('Stop');
          
          clearInterval(pauseInterval.current);
          pauseInterval.current = undefined;

          if(!interval.current) {
            interval.current = setInterval(() => {
              dispatch(updateTime('dec'));
              dispatch(increaseWorkTime());
            }, 1000);
          }
        }

        break;
      
      case 'Break':
        if(primaryBtn === 'Pause') {
          setPrimaryBtn('Resume');
          setSecondaryBtn('Skip');
         
          if(!pauseInterval.current) {
            pauseInterval.current = setInterval(() => {
              dispatch(increasePauseTime());
            }, 1000);
          }

          clearInterval(interval.current);
          interval.current = undefined;
        } else {
          setPrimaryBtn('Pause');
         
          clearInterval(pauseInterval.current);
          pauseInterval.current = undefined;

          if(!interval.current) {
            interval.current = setInterval(() => {
              dispatch(updateTime('dec'));
            }, 1000);
          }
        } 
    }  
  }

  function handleSecClick() {
    switch(timerState) {
      case 'Active':
        if(secondaryBtn === 'Stop') {
          dispatch(increaseStopCount());
          resetTimer();
        } else {
          clearInterval(pauseInterval.current);
          pauseInterval.current = undefined;

          dispatch(updateTimerState('Break'));
          startBreak();
        } 

        break;
      
      case 'Break': 
        if(primaryBtn === 'Resume') {
          clearInterval(pauseInterval.current);
          pauseInterval.current = undefined;
        } 

        dispatch(increaseTomatoCount());
        resetTimer();
    }
  }

  function handleIncClick() {
    dispatch(updateTime('inc'));
  }

  useEffect(() => {
    if(timer.time === 0 && timerState === 'Break') {
      if(timer.notifications) setIsNotificationOpen(true);
      dispatch(increaseTomatoCount());

      resetTimer();
     } else if(timer.time === 0) {
      if(timer.notifications) setIsNotificationOpen(true);
      dispatch(updateTimerState('Break'));
      startBreak();
    }

    if(timer.time === 2000) {
      if(timer.notifications) new Audio(sound).play();
    }
  }, [timer, dispatch, startBreak, resetTimer, timerState])

  return (
    <div className='timerControl'>
        <button className='primaryBtn' onClick={handlePrimeClick}> { formatMessage(primaryBtn) } </button>
        <button className={`secondaryBtn ${timerState}`} onClick={handleSecClick}> { formatMessage(secondaryBtn) } </button>
        <button className={`incBtn ${timerState}`} onClick={handleIncClick}></button>

        {createPortal ((
          <Notification isOpen={isNotificationOpen} timerState={timerState} setIsOpen={setIsNotificationOpen} />
        ), node)}
    </div>
  )
}