import './left.css';
import tomato from '../../../img/tomato.svg';
import tomato2 from '../../../img/tomato2.svg';
import { IWeekStats } from '../../../store/reducer';
import { formatMessage } from 'devextreme/localization';

interface ILeft {
  currentDay: IWeekStats;
}

export function formatTime(ms: number) {
  let minutes = Math.floor(ms / 1000 / 60);

  if(minutes > 59) {
    const hours = Math.floor(minutes / 60);
    minutes = minutes %  60;

    return { hours, minutes };
  }

  return { minutes };
}

export function Left({ currentDay }: ILeft) {
  const weekDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
  const date = new Date(currentDay.date);

  return (
    <div className='leftWrap'>
      <div className='leftTop'>
        <h2 className='leftName'> { formatMessage(weekDays[date.getDay()]) } </h2>
            
        { currentDay.data.workTime ? 
          <p className='leftData'>
            { formatMessage('You have been working on the tasks for') }
            <span className='workTime'> { 
              formatTime(currentDay.data.workTime).hours ? `${formatTime(currentDay.data.workTime).hours} ${ formatMessage('hours') } ${formatTime(currentDay.data.workTime).minutes} ${ formatMessage('minute') }` : `${formatTime(currentDay.data.workTime).minutes} ${ formatMessage('minutes') }`} 
            </span>
          </p> : 
          <p className="leftData">{ formatMessage('No data') }</p>
        }
      </div>

        { currentDay.data.tomatoCount ? 
          <div className='leftBottom'>
            <span className='tomatoCount'>
              <img src={tomato2} alt=''/> 
              x {currentDay.data.tomatoCount} 
            </span>
            <div className='tomatoCountBottom'>{currentDay.data.tomatoCount} { formatMessage('pomodoros') }</div>
          </div>
          : 
          <div className='leftBottom disabled'>
            <img src={tomato} alt=''/>
          </div>
        }
    </div>
  );
}