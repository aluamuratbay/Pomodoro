import './statistics.css';
import Select, { SingleValue } from 'react-select';
import { Chart } from './Chart';
import { Left } from './Left';
import { Bottom } from './Bottom';
import { useSelector } from 'react-redux';
import { IWeekStats, RootState } from '../../store/reducer';
import { useState } from 'react';
import { formatMessage } from 'devextreme/localization';

export function Statistics() {
  const thisWeek = useSelector<RootState, IWeekStats[]>(state => state.thisWeek);
  const lastWeek =  useSelector<RootState, IWeekStats[]>(state => state.lastWeek);
  const twoWeeksAgo =  useSelector<RootState, IWeekStats[]>(state => state.twoWeeksAgo);

  let thisDay = new Date().getDay();

  if(thisDay === 0) {
    thisDay = 6;
  } else {
    thisDay -= 1;
  }

  const [currentWeek, setCurrentWeek] = useState(thisWeek);
  const [currentDay, setCurrentDay] = useState(currentWeek[thisDay]);

  const options = [
    { value: 'thisWeek', label: formatMessage('This week') },
    { value: 'lastWeek', label: formatMessage('Last week') },
    { value: 'twoWeeksAgo', label: formatMessage('2 weeks ago') },
  ];
  const handleChange = (selectedOption: SingleValue<{ value: string; label: string;}>) => {
    if(selectedOption?.value === 'thisWeek') {
      setCurrentWeek(thisWeek);
      setCurrentDay(thisWeek[thisDay]);
    } else if(selectedOption?.value === 'lastWeek') {
      setCurrentWeek(lastWeek);
      setCurrentDay(lastWeek[0]);
    } else if(selectedOption?.value === 'twoWeeksAgo') {
      setCurrentWeek(twoWeeksAgo);
      setCurrentDay(twoWeeksAgo[0]);
    }
  };

  return (
    <div className='statsWrap'>
      <h1 className='statsTitle'>{ formatMessage('Your activity') }</h1>
      <div className="statsSelect">
        <Select 
          styles={
            {
              control: (base, props) => ({
                ...base,
                padding: '10px 5px',
                border: 'none',
                borderRadius: '0',
                backgroundColor: 'var(--dataBlock)',
                outline: 'none',
                cursor: 'pointer',
              }),
              indicatorSeparator: (base, props) => ({
                ...base,
                display: 'none',
              }),
              menu: (base, props) => ({
                ...base,
                top: '50px',
                padding: '0',
                borderRadius: '0',
                backgroundColor: 'var(--dataBlock)',
              }),
              option: (base, props) => ({
                ...base,
                padding: '15px 15px',
                borderTop: '1px solid var(--greyDE)',
                fontSize: '16px',
                color: 'var(--black)',
                display: props.isSelected? 'none' : 'block',
                backgroundColor: props.isFocused ? 'var(--selectHover)' :'var(--dataBlock)', 
                cursor: 'pointer',
              }),
              singleValue: (base, props) => ({
                ...base,
                fontSize: '16px',
                color: 'var(--black)',
              }),
            }
          } 
          options={options}
          defaultValue={options[0]}
          onChange={handleChange}
          isSearchable={false}
        />
      </div> 

      <div className='statsTop'>
        <Left currentDay={currentDay} />
        <Chart currentWeek={currentWeek} currentDay={currentDay} setCurrentDay={setCurrentDay} />
      </div>
      <Bottom currentDay={currentDay} />
    </div>
  );
}