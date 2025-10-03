import { ActionCreator, AnyAction, Reducer } from "redux";
import { nanoid } from "nanoid";
import { ITaskList } from "../shared/TaskList";
const ms = require("ms");
const thisDay = new Date().getDay();
const moment = require('moment');
let startOfWeek;
let oneWeek;
let twoWeeks;

if(thisDay === 0) {
  startOfWeek = moment().startOf('week').subtract(6, 'day');
  oneWeek = moment().subtract(8, 'days');
  twoWeeks = moment().subtract(15, 'days');
} else {
  startOfWeek = moment().startOf('week').add(1, 'day');
  oneWeek = moment().subtract(7, 'days');
  twoWeeks = moment().subtract(14, 'days');
}

export interface IData {
  tomatoCount: number;
  workTime: number,
  pauseTime: number,
  stopCount: number,
}

export interface IWeekStats {
  date: Date, 
  data: {
    tomatoCount: number;
    workTime: number,
    pauseTime: number,
    stopCount: number,
  }
}

export interface ITimer { 
  time: number; 
  timerState: string; 
  tomatoDuration: number; 
  shortBreak: number; 
  longBreak: number;
  breakFrequency: number;
  notifications: boolean;
}

export type RootState = {
  taskList: ITaskList[];
  timer: ITimer;
  data: IData;
  statisticsData: IWeekStats[];
  thisWeek: IWeekStats[];
  lastWeek: IWeekStats[];
  twoWeeksAgo: IWeekStats[];
}

const initialState:RootState = {
  taskList: [],
  timer: { time: ms('25m'), timerState: 'Disabled', tomatoDuration: 25, shortBreak: 5, longBreak: 15, breakFrequency: 4, notifications: true },
  data: {
    tomatoCount: 0,
    workTime: ms('0'),
    pauseTime: ms('0'),
    stopCount: 0,
  },
  statisticsData: [],
  thisWeek: [
    { date: startOfWeek.format('LL'),
      data: {
        tomatoCount: 0,
        workTime: 0,
        pauseTime: 0,
        stopCount: 0,
      }},
    { date: startOfWeek.add(1, 'day').format('LL'), data: {
      tomatoCount: 0,
      workTime: 0,
      pauseTime: 0,
      stopCount: 0,
    }},
    { date: startOfWeek.add(1, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    { date: startOfWeek.add(1, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    { date: startOfWeek.add(1, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    { date: startOfWeek.add(1, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    { date: startOfWeek.add(1, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    ],
  lastWeek: [
    { date: oneWeek.startOf('week').add(1, 'day').format('LL'),
      data: {
        tomatoCount: 0,
        workTime: 0,
        pauseTime: 0,
        stopCount: 0,
      }},
    { date: oneWeek.startOf('week').add(2, 'day').format('LL'), data: {
      tomatoCount: 0,
      workTime: 0,
      pauseTime: 0,
      stopCount: 0,
    }},
    { date: oneWeek.startOf('week').add(3, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    { date: oneWeek.startOf('week').add(4, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    { date: oneWeek.startOf('week').add(5, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    { date: oneWeek.startOf('week').add(6, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    { date: oneWeek.startOf('week').add(7, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    ],
  twoWeeksAgo: [
    { date: twoWeeks.startOf('week').add(1, 'day').format('LL'),
      data: {
        tomatoCount: 0,
        workTime: 0,
        pauseTime: 0,
        stopCount: 0,
      }},
    { date: twoWeeks.startOf('week').add(2, 'day').format('LL'), data: {
      tomatoCount: 0,
      workTime: 0,
      pauseTime: 0,
      stopCount: 0,
    }},
    { date: twoWeeks.startOf('week').add(3, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    { date: twoWeeks.startOf('week').add(4, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    { date: twoWeeks.startOf('week').add(5, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    { date: twoWeeks.startOf('week').add(6, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
    { date: twoWeeks.startOf('week').add(7, 'day').format('LL'),
      data: {
          tomatoCount: 0,
          workTime: 0,
          pauseTime: 0,
          stopCount: 0,
        }},
  ],  
}

const UPDATE_TASKLIST = 'UPDATE_TASKLIST';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';

const UPDATE_TIME = 'UPDATE_TIME';
const UPDATE_TOMATODURATION = 'UPDATE_TOMATODURATION';
const UPDATE_SHORTBREAK = 'UPDATE_SHORTBREAK';
const UPDATE_LONGBREAK = 'UPDATE_LONGBREAK';
const UPDATE_BREAKFREQUENCY = 'UPDATE_BREAKFREQUENCY';
const UPDATE_TIMERSTATE = 'UPDATE_TIMERSTATE';
const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS'

const INCREASE_TOMATOCOUNT = 'INCREASE_TOMATOCOUNT';
const INCREASE_STOPCOUNT = 'INCREASE_STOPCOUNT';
const INCREASE_WORKTIME = 'INCREASE_WORKTIME';
const INCREASE_PAUSETIME = 'INCREASE_PAUSETIME';
const CLEAR_DATA = 'CLEAR_DATA';

const ADD_STATISTICSDATA = 'ADD_STATISTICSDATA';
const ADD_THISWEEK = 'ADD_THISWEEK';
const ADD_LASTWEEK = 'ADD_LASTWEEK';
const ADD_TWOWEEKSAGO = 'ADD_TWOWEEKSAGO';

export const updateTaskList: ActionCreator<AnyAction> = (text) => ({
  type: UPDATE_TASKLIST, 
  text,
});
export const updateTask: ActionCreator<AnyAction> = (id, value) => ({
  type: UPDATE_TASK, 
  id,
  value,
});
export const deleteTask: ActionCreator<AnyAction> = (id) => ({
  type: DELETE_TASK,
  id,
})

export const updateTime: ActionCreator<AnyAction> = (value) => ({
  type: UPDATE_TIME,
  value,
})
export const updateTomatoDuration: ActionCreator<AnyAction> = (value) => ({
  type: UPDATE_TOMATODURATION,
  value,
})
export const updateShortBreak: ActionCreator<AnyAction> = (value) => ({
  type: UPDATE_SHORTBREAK,
  value,
})
export const updateLongBreak: ActionCreator<AnyAction> = (value) => ({
  type: UPDATE_LONGBREAK,
  value,
})
export const updateBreakFrequency: ActionCreator<AnyAction> = (value) => ({
  type: UPDATE_BREAKFREQUENCY,
  value,
})
export const updateTimerState: ActionCreator<AnyAction> = (value) => ({
  type: UPDATE_TIMERSTATE,
  value
})
export const updateNotifications: ActionCreator<AnyAction> = (value) => ({
  type: UPDATE_NOTIFICATIONS,
})

export const increaseTomatoCount:ActionCreator<AnyAction> = () => ({
  type: INCREASE_TOMATOCOUNT,
})
export const increaseStopCount:ActionCreator<AnyAction> = () => ({
  type: INCREASE_STOPCOUNT,
})
export const increaseWorkTime:ActionCreator<AnyAction> = () => ({
  type: INCREASE_WORKTIME,
})
export const increasePauseTime:ActionCreator<AnyAction> = () => ({
  type: INCREASE_PAUSETIME,
})
export const clearData: ActionCreator<AnyAction> = () => ({
  type: CLEAR_DATA,
})

export const addStatisticsData:ActionCreator<AnyAction> = (date, data) => ({
  type: ADD_STATISTICSDATA,
  date,
  data
})
export const addThisWeek: ActionCreator<AnyAction> = (date, data) => ({
  type: ADD_THISWEEK, 
  date,
  data,
});
export const addLastWeek: ActionCreator<AnyAction> = (date, data) => ({
  type: ADD_LASTWEEK, 
  date,
  data,
});
export const addTwoWeeksAgo: ActionCreator<AnyAction> = (date, data) => ({
  type: ADD_TWOWEEKSAGO,
  date,
  data,
});

export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TASKLIST: 
      return {
        ...state,
        taskList: [...state.taskList, { id: nanoid(), name: action.text, amount: 1, done: false, started: false, date: new Date() }],
      }

    case UPDATE_TASK:
      for(const task of state.taskList) {
        if(task.id === action.id) {
          switch(action.value) {
            case 'inc': task.amount++; break;
            case 'dec': if(task.amount > 1) task.amount--; break;
            case 'done': task.done = true; break;
            case 'started': task.started = true; break;
            default: task.name = action.value;
          }
        }
      }

      return {
        ...state,
        taskList: [...state.taskList],
      }
    
    case DELETE_TASK:
      for(const task of state.taskList) {
        if(task.id === action.id) {
          const index = state.taskList.indexOf(task);
          state.taskList.splice(index, 1);
        }
      }

      return {
        ...state,
        taskList: [...state.taskList],
      }  

    case UPDATE_TIME:
      switch(action.value) {
        case 'inc': state.timer.time += ms('1m'); break;
        case 'dec': if(state.timer.time > 0) state.timer.time -= ms('1s'); break;
        default: state.timer.time = ms(action.value);
      }

      return {
        ...state,
        timer: {
          ...state.timer,
          time: state.timer.time,
        }
      }

    case UPDATE_TOMATODURATION:
    return {
      ...state,
      timer: {
        ...state.timer,
        tomatoDuration: action.value,
      }
    }

    case UPDATE_SHORTBREAK:
    return {
      ...state,
      timer: {
        ...state.timer,
        shortBreak: action.value,
      }
    }

    case UPDATE_LONGBREAK:
    return {
      ...state,
      timer: {
        ...state.timer,
        longBreak: action.value,
      }
    }

    case UPDATE_BREAKFREQUENCY:
    return {
      ...state,
      timer: {
        ...state.timer,
        breakFrequency: action.value,
      }
    }

    case UPDATE_TIMERSTATE:
      return {
        ...state,
        timer: {
          ...state.timer,
          timerState: action.value,
        }
      }

    case UPDATE_NOTIFICATIONS:  
      return {
        ...state,
        timer: {
          ...state.timer,
          notifications: !state.timer.notifications,
        }
      }

    case INCREASE_TOMATOCOUNT:
      return {
        ...state,
        data: {
          ...state.data,
          tomatoCount: state.data.tomatoCount + 1
        }
      }

    case INCREASE_STOPCOUNT:
      return {
        ...state,
        data: {
          ...state.data,
          stopCount: state.data.stopCount + 1,
        }
      }  

    case INCREASE_WORKTIME:
      return {
        ...state,
        data: {
          ...state.data,
          workTime: state.data.workTime + ms('1s'),
        }
      }
        
    case INCREASE_PAUSETIME:
      return {
        ...state,
        data: {
          ...state.data,
          pauseTime: state.data.pauseTime + ms('1s'),
        }
      }
     
    case CLEAR_DATA:  
      return {
        ...state,
        data: {
          ...state.data,
          tomatoCount: 0,
          stopCount: 0,
          workTime: 0,
          pauseTime: 0,
        }
      }

    case ADD_STATISTICSDATA:
      for(const day of state.statisticsData) {
        if(day.date === moment(new Date()).format('LL')) {
          day.data = action.data;
        }
      }

      return {
        ...state,
        statisticsData: [...state.statisticsData],
      }  
        
    case ADD_THISWEEK:
      for(const day of state.thisWeek) {
        if(day.date === action.date) {
          day.data = action.data;
        }
      }

      return {
        ...state,
        thisWeek: [...state.thisWeek],
      }  
    
    case ADD_LASTWEEK:
      for(const day of state.lastWeek) {
        if(day.date === action.date) {
          day.data = action.data;
        }
      }

      return {
        ...state,
      lastWeek: [...state.lastWeek],
      }  
    
    case ADD_TWOWEEKSAGO:
      for(const day of state.twoWeeksAgo) {
        if(day.date === action.date) {
          day.data = action.data;
        }
      }

      return {
        ...state,
        twoWeeksAgo: [...state.twoWeeksAgo],
      }    

    default: 
      return state;
  }
}