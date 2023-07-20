import { useSelector } from 'react-redux';
import './timerHeader.css';
import { RootState } from '../../../reducer';

interface ITimerHeader {
  name: string;
  timerState: string;
}

export function TimerHeader({ name, timerState }: ITimerHeader) {
  const tomatoCount = useSelector<RootState, number>(state => state.data.tomatoCount);

  return (
    <div className={`timerHeader ${timerState}`}>
      <p className='timerTask'>{ name }</p>
      <p className='timerPomidor'>{ timerState === 'Break' ? 'Перерыв' : 'Помидор' } {tomatoCount + 1} </p>
    </div>
  )
}