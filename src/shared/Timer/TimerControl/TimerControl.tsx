import './timerControl.css';
import { useDispatch, useSelector } from 'react-redux';
import { ITimer, RootState, increasePauseTime, increaseStopCount, increaseTomatoCount, increaseWorkTime, updateTask, updateTime, updateTimerState } from '../../../reducer';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Notification } from './Notification';
import { ITaskList } from '../../TaskList';
import sound from '../../../assests/timer-finish.mp3';
import { createPortal } from 'react-dom';
import { node } from '../../Timer';

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
  const [primaryBtn, setPrimaryBtn] = useState('Старт');
  const [secondaryBtn, setSecondaryBtn] = useState('Стоп');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const interval = useRef<ReturnType<typeof setInterval>>();
  const pauseInterval = useRef<ReturnType<typeof setInterval>>();

  const startBreak = useCallback(() => {
    setPrimaryBtn('Пауза');
    setSecondaryBtn('Пропустить');
    
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
    setPrimaryBtn('Старт');
    setSecondaryBtn('Стоп');

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
        setPrimaryBtn('Пауза');
        setSecondaryBtn('Стоп');

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
        if(primaryBtn === 'Пауза') {
          setPrimaryBtn('Продолжить');
          setSecondaryBtn('Сделано')
          
          if(!pauseInterval.current) {
            pauseInterval.current = setInterval(() => {
              dispatch(increasePauseTime());
            }, 1000);
          }

          clearInterval(interval.current);
          interval.current = undefined;
        } else {
          setPrimaryBtn('Пауза');
          setSecondaryBtn('Стоп');
          
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
        if(primaryBtn === 'Пауза') {
          setPrimaryBtn('Продолжить');
          setSecondaryBtn('Пропустить')
         
          if(!pauseInterval.current) {
            pauseInterval.current = setInterval(() => {
              dispatch(increasePauseTime());
            }, 1000);
          }

          clearInterval(interval.current);
          interval.current = undefined;
        } else {
          setPrimaryBtn('Пауза');
         
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
        if(secondaryBtn === 'Стоп') {
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
        if(primaryBtn === 'Продолжить') {
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
        <button className='primaryBtn' onClick={handlePrimeClick}> { primaryBtn} </button>
        <button className={`secondaryBtn ${timerState}`} onClick={handleSecClick}> {secondaryBtn} </button>
        <button className={`incBtn ${timerState}`} onClick={handleIncClick}></button>

        {createPortal ((
          <Notification isOpen={isNotificationOpen} timerState={timerState} setIsOpen={setIsNotificationOpen} />
        ), node)}
    </div>
  )
}


/*
const dispatch = useDispatch();
  const timer = useSelector<RootState, ITimer>(state => state.timer);
  const [primaryBtn, setPrimaryBtn] = useState('Старт');
  const [secondaryBtn, setSecondaryBtn] = useState('Стоп');
  const [sessionCount, setSessionCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const interval = useRef<ReturnType<typeof setInterval>>();
  const pauseInterval = useRef<ReturnType<typeof setInterval>>();

  const startBreak = useCallback(() => {
    setSessionCount(sessionCount + 1);
    setPrimaryBtn('Пауза');
    setSecondaryBtn('Пропустить');

    if(sessionCount === timer.breakFrequency - 1) {
      setSessionCount(0);
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
  }, [dispatch, sessionCount, timer]);


import './timerControl.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateTask, updateTime, updateTimerState } from '../../../store';
import { useEffect, useRef, useState } from 'react';

interface ITimerControl {
  id: string;
  tomato: number;
  timerState: string;
}

export function TimerControl({ id, tomato, timerState }: ITimerControl) {
  const dispatch = useDispatch();
  const time = useSelector<RootState, number>(state => state.time);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [startBtn, setStartBtn] = useState('Старт');
  const [stopBtn, setStopBtn] = useState('Стоп');
  const [sessionCount, setSessionCount] = useState(0);

  function handleIncClick() {
    dispatch(updateTime('inc'));
  }

  function handleStartClick() {
    if(startBtn === 'Старт' || startBtn === 'Продолжить') {
      setStartBtn('Пауза');

      if(timerState !== 'Break') { 
        dispatch(updateTimerState('Active'));

        if(tomato > 1 && startBtn === 'Старт') {
          dispatch(updateTask(id, 'dec'));
        } else if(startBtn === 'Старт'){
          dispatch(updateTask(id, 'done'));
        }

        setStopBtn('Стоп');
      }

      if(!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          dispatch(updateTime('dec'));
        }, 1000);
      }
    } else if(startBtn === 'Пауза') {
      setStartBtn('Продолжить');
      
      if(timerState !== 'Break') { 
        setStopBtn('Сделано');
      }

      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  function handleStopClick() {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;    
    dispatch(updateTime('2'));

    if(tomato > 1) {
      //dispatch(updateTask(id, 'dec'));
      dispatch(updateTask(id, 'completed'));
      dispatch(updateTimerState('Default'));
    } else {
      //dispatch(updateTask(id, 'done'));
      dispatch(updateTimerState('Disabled'));
    }

    setStartBtn('Старт');
    setStopBtn('Стоп');
  };

  useEffect(() => {
    if(time === 0 && timerState === 'Active') {
      setSessionCount(sessionCount + 1);
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      dispatch(updateTimerState('Break'));
      
      setStartBtn('Пауза');
      setStopBtn('Пропустить');

      if(sessionCount === 3) {
        setSessionCount(0);
        dispatch(updateTime('15m'));
      } else {
        dispatch(updateTime('5m'));
      }

      if(!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          dispatch(updateTime('dec'));
        }, 1000);
      }
    } else if (time === 0) {
        handleStopClick();
    }
  }, [time]);

  return (
    <div className='timerControl'>
        <button className='startBtn' onClick={ handleStartClick }>{ startBtn }</button>
        <button className={`stopBtn ${timerState}`} onClick={ handleStopClick }>{ stopBtn }</button>
        <button className={`incBtn ${timerState}`} onClick={ handleIncClick }></button>
    </div>
  )
}
*/

/*
import { useDispatch, useSelector } from 'react-redux';
import './timerControl.css';
import { RootState, updateTask, updateTime } from '../../../store';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface ITimerControl {
  id: string;
  tomato: number;
  timerState: string;
  setTimerState: Dispatch<SetStateAction<string>>;
}

export function TimerControl({ id, tomato, timerState, setTimerState }: ITimerControl) {
  const dispatch = useDispatch();
  const time = useSelector<RootState, number>(state => state.time);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [startBtn, setStartBtn] = useState('Старт');
  const [stopBtn, setStopBtn] = useState('Стоп');
  const [sessionCount, setSessionCount] = useState(0);

  function handleIncClick() {
    dispatch(updateTime('inc'));
  }

  function handleStartClick() {
    if(startBtn === 'Старт' || startBtn === 'Продолжить') {
      setStartBtn('Пауза');

      if(timerState !== 'Break') { 
        setTimerState('Active');
        setStopBtn('Стоп');
      }

      if(!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          dispatch(updateTime('dec'));
        }, 1000);
      }
    } else if(startBtn === 'Пауза') {
      setStartBtn('Продолжить');
      
      if(timerState !== 'Break') { 
        setStopBtn('Сделано');
      }

      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  function handleStopClick() {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;    
    dispatch(updateTime('5s'));

    if(tomato > 1) {
      dispatch(updateTask(id, 'dec'));
      dispatch(updateTask(id, 'completed'));
      setTimerState('Default');
    } else {
      dispatch(updateTask(id, 'done'));
      setTimerState('Disabled');
    }

    setStartBtn('Старт');
    setStopBtn('Стоп');
  };

  useEffect(() => {
    if(time === 0 && timerState === 'Active') {
      setSessionCount(sessionCount + 1);
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      setTimerState('Break');
      
      setStartBtn('Пауза');
      setStopBtn('Пропустить');

      if(sessionCount === 3) {
        setSessionCount(0);
        dispatch(updateTime('15s'));
      } else {
        dispatch(updateTime('5s'));
      }

      if(!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          dispatch(updateTime('dec'));
        }, 1000);
      }
    } else if (time === 0) {
        handleStopClick();
    }
  }, [time]);

  return (
    <div className='timerControl'>
        <button className='startBtn' onClick={ handleStartClick }>{ startBtn }</button>
        <button className={`stopBtn ${timerState}`} onClick={ handleStopClick }>{ stopBtn }</button>
        <button className={`incBtn ${timerState}`} onClick={ handleIncClick }></button>
    </div>
  )
}



 function startBreak() {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;

    setTimerState('Break');
    setStartBtn('Пауза');
    setStopBtn('Пропустить');

    dispatch(updateTime('5m'));

    if(!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        dispatch(updateTime('dec'));
      }, 1000);
    }
  }

import { useDispatch } from 'react-redux';
import './timerControl.css';
import { updateTime } from '../../../store';

interface ITimerControl {
  id: string;
}

export function TimerControl({ id }: ITimerControl) { 
  const dispatch = useDispatch();

  function handleAddClick() {
    dispatch(updateTime(id, 'inc'));
  }

  return (
    <div className='timerControl'>
        <button className='start-btn'>Старт</button>
        <button className='stop-btn' disabled={id === '' ? true : false}>Стоп</button>
        <button className='inc-btn' onClick={ handleAddClick  }></button>
    </div>
  )
}

  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  function handleStartClick() {
    if(!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        dispatch(updateTime(id, 'dec'));
      }, 1000);
    }
  };

  function handleStopClick() {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  };
*/