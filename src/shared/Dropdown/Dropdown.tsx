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