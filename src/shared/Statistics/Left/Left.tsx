import './left.css';
import tomato from '../../../img/tomato.svg';
import tomato2 from '../../../img/tomato2.svg';
import { IWeekStats } from '../../../reducer';

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
  const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const date = new Date(currentDay.date);

  return (
    <div className='leftWrap'>
      <div className='leftTop'>
        <h2 className='leftName'> {weekDays[date.getDay()]} </h2>
            
        { currentDay.data.workTime ? 
          <p className='leftData'>
            Вы работали над задачами в течение 
            <span className='workTime'> { 
              formatTime(currentDay.data.workTime).hours ? `${formatTime(currentDay.data.workTime).hours} часов ${formatTime(currentDay.data.workTime).minutes} минут` : `${formatTime(currentDay.data.workTime).minutes} минуты`} 
            </span>
          </p> : 
          <p className="leftData">Нет данных</p>
        }
      </div>

        { currentDay.data.tomatoCount ? 
          <div className='leftBottom'>
            <span className='tomatoCount'>
              <img src={tomato2} alt=''/> 
              x {currentDay.data.tomatoCount} 
            </span>
            <div className='tomatoCountBottom'>{currentDay.data.tomatoCount} помидора</div>
          </div>
          : 
          <div className='leftBottom disabled'>
            <img src={tomato} alt=''/>
          </div>
        }
    </div>
  );
}