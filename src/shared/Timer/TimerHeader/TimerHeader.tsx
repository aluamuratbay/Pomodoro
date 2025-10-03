import { useSelector } from 'react-redux';
import './timerHeader.css';
import { RootState } from '../../../store/reducer';
import { formatMessage } from 'devextreme/localization';

interface ITimerHeader {
  name: string;
  timerState: string;
}

export function TimerHeader({ name, timerState }: ITimerHeader) {
  const tomatoCount = useSelector<RootState, number>(state => state.data.tomatoCount);

  return (
    <div className={`timerHeader ${timerState}`}>
      <p className='timerTask'>{ name }</p>
      <p className='timerPomidor'>{ formatMessage(timerState === 'Break' ? 'Break' : 'Pomodoro') } {tomatoCount + 1} </p>
    </div>
  )
}