import './settings.css';
import { CrossIcon } from '../../Icons';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateBreakFrequency, updateLongBreak, updateNotifications, updateShortBreak, updateTomatoDuration } from '../../../reducer';

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
            Настройки таймера
          </h1>
        
          <div className='settingsBody'>
            <div className='settingsDivider'></div>
            <h2 className='settingsName'>Продолжительность помидора</h2>
            <p className='settingsDescr'>Укажите предпочитаюмую продолжительность одного помидора</p>
            <label className='settingsLabel'>
              <input type="number" className='settingsInput' id='tomatoDuration' defaultValue={tomatoDuration} />
              <span className='settingsMeasure'>в минутах</span>
            </label>
          
            <h2 className='settingsName'>Продолжительность короткого перерыва</h2>
            <p className='settingsDescr'>Укажите продолжительность короткого перерыва после каждого помидора</p>
            <label className='settingsLabel'>
              <input type="number" className='settingsInput' id='shortBreak' defaultValue={shortBreak} />
              <span className='settingsMeasure'>в минутах</span>
            </label>

            <h2 className='settingsName'>Продолжительность длинного перерыва</h2>
            <p className='settingsDescr'>Укажите продолжительность длинного перерыва после каждого {breakFrequency} помидора</p>
            <label className='settingsLabel'>
              <input type="number" className='settingsInput' id='longBreak' defaultValue={longBreak} />
              <span className='settingsMeasure'>в минутах</span>
            </label>

            <h2 className='settingsName'>Частота длинных перерывов</h2>
            <p className='settingsDescr'>Укажите количество помидоров через которых будут срабатывать длинные перерывы</p>
            <label className='settingsLabel'>
              <input type="number" className='settingsInput' id='breakFrequency' defaultValue={breakFrequency} />
              <span className='settingsMeasure'>в помидорах</span>
            </label>

            <div className='settingsDivider'></div>
            <h2 className='settingsName'>Уведомления по окончанию таймера</h2>

            <div className="toggleWrap">
              <p className='settingsDescr'>Выберите, если хотите получать браузерные уведомления по окончанию таймера</p>
              <div className={ notifications ? "toggle active" : "toggle"} onClick={() => dispatch(updateNotifications())}>
                <i className="indicator"></i>
              </div>
            </div>
          </div>

          <button className="saveBtn" onClick={() => handleClick()}>Сохранить</button>
          <button className="cancelBtnSettings" onClick={() => setIsOpen(false)}>Отмена </button>
          <button className='collapseBtn'  onClick={() => setIsOpen(false)}>
            <CrossIcon />
          </button>
        </div>
      </div>
    }
    </>
  );
}