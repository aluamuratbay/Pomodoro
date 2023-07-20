import './header.css';
import logo from '../../img/pomodoro-logo.svg';
import { Link } from 'react-router-dom';
import { EqualizerIcon } from '../Icons';
import { useEffect, useState } from 'react';

export function Header() {
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

      <Link to="/statistics" className="headerStatistics">
        <EqualizerIcon />
        Статистика
      </Link>
    </header>
  );
}