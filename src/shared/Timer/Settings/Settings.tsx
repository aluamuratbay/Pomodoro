import './settings.css';
import { CrossIcon } from '../../Icons';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateBreakFrequency, updateLongBreak, updateNotifications, updateShortBreak, updateTomatoDuration } from '../../../store/reducer';
import { formatMessage } from 'devextreme/localization';

interface IDeleteItem {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function Settings({ isOpen, setIsOpen }: IDeleteItem) {
  const dispatch = useDispatch();
  const tomatoDuration = useSelector<RootState, number>(state => state.timer.tomatoDuration);
  const shortBreak = useSelector<RootState, number>(state => state.timer.shortBreak);
  const longBreak = useSelector<RootState, number>(state => state.timer.longBreak);
  const breakFrequency = useSelector<RootState, number>(state => state.timer.breakFrequency);
  const notifications = useSelector<RootState, boolean>(state => state.timer.notifications);
  
  function handleClick() {
    setIsOpen(false);
    const tomatoDuration = document.getElementById("tomatoDuration");
    const shortBreak = document.getElementById("shortBreak");
    const longBreak = document.getElementById("longBreak");
    const breakFrequency = document.getElementById("breakFrequency");

    if(tomatoDuration instanceof HTMLInputElement && tomatoDuration.value) {
      dispatch(updateTomatoDuration(tomatoDuration.value));
    }

    if(shortBreak instanceof HTMLInputElement && shortBreak.value) {
      dispatch(updateShortBreak(shortBreak.value));
    }

    if(longBreak instanceof HTMLInputElement && longBreak.value) {
      dispatch(updateLongBreak(longBreak.value));
    }

    if(breakFrequency instanceof HTMLInputElement && breakFrequency.value) {
      dispatch(updateBreakFrequency(breakFrequency.value));
    }
  }

  return (
    <>
    {isOpen &&
      <div className='modalWrap'>
        <div className='settingsContent'>
          <h1 className="settingsTitle">
            { formatMessage('Timer settings') }
          </h1>
        
          <div className='settingsBody'>
            <div className='settingsDivider'></div>
            <h2 className='settingsName'>{ formatMessage('Pomodoro Duration') }</h2>
            <p className='settingsDescr'>{ formatMessage('Please indicate your preferred duration of one pomodoro') }</p>
            <label className='settingsLabel'>
              <input type="number" className='settingsInput' id='tomatoDuration' defaultValue={tomatoDuration} />
              <span className='settingsMeasure'>{ formatMessage('in minutes') }</span>
            </label>
          
            <h2 className='settingsName'>{ formatMessage('Duration of a short break') }</h2>
            <p className='settingsDescr'>{ formatMessage('Specify the duration of the short break after each pomodoro') }</p>
            <label className='settingsLabel'>
              <input type="number" className='settingsInput' id='shortBreak' defaultValue={shortBreak} />
              <span className='settingsMeasure'>{ formatMessage('in minutes') }</span>
            </label>

            <h2 className='settingsName'>{ formatMessage('Duration of a long break') }</h2>
            <p className='settingsDescr'>{ formatMessage('Specify the duration of the long break after each') } {breakFrequency} { formatMessage("pomodoros") }</p>
            <label className='settingsLabel'>
              <input type="number" className='settingsInput' id='longBreak' defaultValue={longBreak} />
              <span className='settingsMeasure'>{ formatMessage('in minutes') }</span>
            </label>

            <h2 className='settingsName'>{ formatMessage('Frequency of long breaks') }</h2>
            <p className='settingsDescr'>{ formatMessage('Specify the number of pomodoros after which long breaks will be triggered') }</p>
            <label className='settingsLabel'>
              <input type="number" className='settingsInput' id='breakFrequency' defaultValue={breakFrequency} />
              <span className='settingsMeasure'>{ formatMessage('in pomodoros') }</span>
            </label>

            <div className='settingsDivider'></div>
            <h2 className='settingsName'>{ formatMessage('Notifications when the timer ends') }</h2>

            <div className="toggleWrap">
              <p className='settingsDescr'>{ formatMessage('Select if you want to receive browser notifications when the timer ends') }</p>
              <div className={ notifications ? "toggle active" : "toggle"} onClick={() => dispatch(updateNotifications())}>
                <i className="indicator"></i>
              </div>
            </div>
          </div>

          <button className="saveBtn" onClick={() => handleClick()}>{ formatMessage('Save') }</button>
          <button className="cancelBtnSettings" onClick={() => setIsOpen(false)}>{ formatMessage('Cancel') }</button>
          <button className='collapseBtn'  onClick={() => setIsOpen(false)}>
            <CrossIcon />
          </button>
        </div>
      </div>
    }
    </>
  );
}