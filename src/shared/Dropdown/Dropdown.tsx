import './dropdown.css';
import { ReactNode } from 'react';

interface IDropdownProps {
  button: ReactNode;
  children: ReactNode;
  isDropdownOpen: boolean;
}

export function Dropdown( { button, children, isDropdownOpen }: IDropdownProps ) {
  return (
    <div className='container'>
      <div>
        { button }
      </div>

      {isDropdownOpen && (
        <div className='list'>
          { children }
        </div>
      )}
    </div>
  );
}


/* 
import {  ReactNode, useRef, useState } from 'react';
import './dropdown.css';

interface IDropdownProps {
  button: ReactNode;
  children: ReactNode;
}

export function Dropdown( { button, children }: IDropdownProps ) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  document.addEventListener('click', (event: MouseEvent) => {
    if(event.target instanceof Node && !ref.current?.contains(event.target))
    setIsDropdownOpen(false);
  });

  return (
    <div className='container' ref={ref}>
      <div onClick={handleOpen}>
        { button }
      </div>

      {isDropdownOpen && (
        <div className='list'>
          { children }
        </div>
      )}
    </div>
  );
}
*/

/*
import { Dispatch, ReactNode, SetStateAction } from 'react';
import './dropdown.css';

interface IDropdownProps {
  button: ReactNode;
  children: ReactNode;
  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

export function Dropdown( { button, children, isDropdownOpen, setIsDropdownOpen }: IDropdownProps ) {
  const handleOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className='container'>
      <div onClick={handleOpen}>
        { button }
      </div>

      {isDropdownOpen && (
        <div className='list'>
          { children }
        </div>
      )}
    </div>
  );
}
*/