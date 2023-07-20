import './menu.css';
import { Dropdown } from '../../../Dropdown';
import { MenuIcon } from '../../../Icons';
import { MenuList } from './MenuList';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

export type IMenu = {
  id: string;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
}

export function Menu({ id, setIsEditable }: IMenu) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  document.addEventListener('click', (event: MouseEvent) => {
    if(event.target instanceof Node && !ref.current?.contains(event.target) && isDropdownOpen)
    setIsDropdownOpen(false);
  });

   return (
    <div className='menu' ref={ref}>
      <Dropdown
        isDropdownOpen={isDropdownOpen}
        button={
          <button className='menuButton' onClick={handleOpen}>
            <MenuIcon/>
          </button>
        }
      >

        <div className='dropdown'>
          <MenuList id={id} setIsEditable={setIsEditable} setIsDropdownOpen={setIsDropdownOpen}/>
        </div>
      </Dropdown>
    </div>
  ); 
}