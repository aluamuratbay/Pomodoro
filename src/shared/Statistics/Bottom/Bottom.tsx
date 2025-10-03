import './bottom.css';
import { IWeekStats } from '../../../store/reducer';
import { FocusIcon, PauseIcon, StopIcon } from '../../Icons';
import { formatTime } from '../Left';
import { formatMessage } from 'devextreme/localization';

interface IBottom{
  currentDay: IWeekStats;
}

export function Bottom({ currentDay }: IBottom) {
  const data = currentDay.data;
  let focus = 0;

  if(Math.floor(data.workTime / 1000 / 60) && Math.floor(data.pauseTime / 1000 / 60))
  focus = Math.round((Math.floor(data.workTime / 1000 / 60) / (Math.floor(data.workTime / 1000 / 60) + Math.floor(data.pauseTime / 1000 / 60))) * 100);

  return (
    <ul className='bottomList'>
      <li className={focus ? 'bottomItem focusActive' : 'bottomItem' }>
        <h2 className={focus ? 'bottomTitle active' : 'bottomTitle'}>{ formatMessage('Focus') }</h2>
        <span className={focus ? 'bottomData active' : 'bottomData'}>{ focus }%</span>
        <FocusIcon className={focus ? 'bottomIcon focusIconActive' : 'bottomIcon' } />
      </li>
      <li className={data.pauseTime ? 'bottomItem pauseActive' : 'bottomItem' }>
        <h2 className={data.pauseTime ? 'bottomTitle active' : 'bottomTitle'}>{ formatMessage('Time on pause') }</h2>
        <span className={data.pauseTime ? 'bottomData active' : 'bottomData'}>{formatTime(currentDay.data.pauseTime).hours ? `${formatTime(currentDay.data.pauseTime).hours}ч ${formatTime(currentDay.data.pauseTime).minutes}м` : `${formatTime(currentDay.data.pauseTime).minutes}м`}</span>
        <PauseIcon className={data.pauseTime ? 'bottomIcon pauseIconActive' : 'bottomIcon' }/>
      </li>
      <li className={data.stopCount ? 'bottomItem stopActive' : 'bottomItem' }>
        <h2 className={data.stopCount ? 'bottomTitle active' : 'bottomTitle'}>{ formatMessage('Stops') }</h2>
        <span className={data.stopCount ? 'bottomData active' : 'bottomData'}>{data.stopCount}</span>
        <StopIcon className={data.stopCount ? 'bottomIcon stopIconActive' : 'bottomIcon' } />
      </li>
    </ul>
  );
}