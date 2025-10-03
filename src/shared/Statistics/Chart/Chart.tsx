import { Dispatch, SetStateAction } from 'react';
import { IWeekStats } from '../../../store/reducer';
import './chart.css';
import { formatMessage } from 'devextreme/localization';

interface IChart {
  currentWeek: IWeekStats[];
  currentDay: IWeekStats;
  setCurrentDay: Dispatch<SetStateAction<IWeekStats>>;
}

export function Chart({ currentWeek, currentDay, setCurrentDay }: IChart) {
  function handleClick(index: number) {
    setCurrentDay(currentWeek[index]);
  }

  function getStyles(index: number) {
    const height = Math.floor(currentWeek[index].data.workTime / 1000 / 60);
    const heightPercent = height / 125 * 100;
    let style;

    if(height < 1) {
      style = { 
        backgroundColor: 'var(--greyC4)',
        height: '5px',
      }
    } else {
      style = { 
        maxHeight: '420px',
        height: `${420 * heightPercent / 100}px`,
      }
    }

    return style;
  }

  const index = currentWeek.indexOf(currentDay);

  return (
    <div className='chartWrap'>
      <div className='divider'></div>
      <span className='sideLabel'>1 { formatMessage('h') } 40 { formatMessage("min") }</span>
      <div className='divider'></div>
      <span className='sideLabel'>1 { formatMessage('h') } 15 { formatMessage("min") }</span>
      <div className='divider'></div>
      <span className='sideLabel'>50 { formatMessage("min") }</span>
      <div className='divider'></div>
      <span className='sideLabel'>25 { formatMessage("min") }</span>

      <div className="barsList">
        <button className={ index === 0 ? "barsItem selected" : "barsItem"} onClick={() => handleClick(0)} style={getStyles(0)}></button>
        <button className={ index === 1 ? "barsItem selected" : "barsItem"} onClick={() => handleClick(1)} style={getStyles(1)}></button>
        <button className={ index === 2 ? "barsItem selected" : "barsItem"} onClick={() => handleClick(2)} style={getStyles(2)}></button>
        <button className={ index === 3 ? "barsItem selected" : "barsItem"} onClick={() => handleClick(3)} style={getStyles(3)}></button>
        <button className={ index === 4 ? "barsItem selected" : "barsItem"} onClick={() => handleClick(4)} style={getStyles(4)}></button>
        <button className={ index === 5 ? "barsItem selected" : "barsItem"} onClick={() => handleClick(5)} style={getStyles(5)}></button>
        <button className={ index === 6 ? "barsItem selected" : "barsItem"} onClick={() => handleClick(6)} style={getStyles(6)}></button>
      </div>

      <div className='bottomLabel'>
        <ul className="labelList">
          <li className={ index === 0 ? "labelItem selected" : "labelItem"}>{ formatMessage('Mon') }</li>
          <li className={ index === 1 ? "labelItem selected" : "labelItem"}>{ formatMessage('Tue') }</li>
          <li className={ index === 2 ? "labelItem selected" : "labelItem"}>{ formatMessage('Wed') }</li>
          <li className={ index === 3 ? "labelItem selected" : "labelItem"}>{ formatMessage('Thu') }</li>
          <li className={ index === 4 ? "labelItem selected" : "labelItem"}>{ formatMessage('Fri') }</li>
          <li className={ index === 5 ? "labelItem selected" : "labelItem"}>{ formatMessage('Sat') }</li>
          <li className={ index === 6 ? "labelItem selected" : "labelItem"}>{ formatMessage('Sun') }</li>
        </ul>
      </div>
    </div>
  );
}