import './header.css';
import logo from '../../img/pomodoro-logo.svg';
import { Link } from 'react-router-dom';
import { EqualizerIcon } from '../Icons';
import { useEffect, useState } from 'react';
import { formatMessage, locale } from 'devextreme/localization';
import { useAppContext } from '../../store/AppState';
import Select, { SingleValue } from 'react-select';

const langOptions = [
  { value: 'English', label: 'English' },
  { value: 'Russian', label: 'Руский' },
];

export function Header() {
  const { language, setLanguage } = useAppContext();
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
      setDarkTheme(true);
    } 
  }, [setDarkTheme]);

  const setTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.setItem('theme', 'light');
      document.body.classList.remove('dark');
      setDarkTheme(false);
    } else {
      localStorage.setItem('theme', 'dark');  
      document.body.classList.add('dark');
      setDarkTheme(true);
    }
  }

  return (
    <header className="header">
      <Link to="/" className="headerLogo">
        <img src={logo} alt="Logo" />
      </Link>

      <div className={ darkTheme ? "toggleTheme active" : "toggleTheme"} onClick={setTheme}>
        <i className="indicatorTheme"></i>
      </div>

       <Select 
          styles={
            {
              control: (base, props) => ({
                ...base,
                marginRight: 20,
                padding: '5px',
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
                padding: '10px',
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
          options={langOptions}
          value={langOptions.find(o => o.value === language) || langOptions[0]}
          onChange={(option: SingleValue<{ value: string; label: string; }>) => {
            if(!option?.value) return;
            locale(option.value);
            setLanguage(option.value || "");
          }}
          isSearchable={false}
        />

      <Link to="/statistics" className="headerStatistics">
        <EqualizerIcon />
        { formatMessage('Statistics') }
      </Link>
    </header>
  );
}