import './menuList.css';
import { useDispatch, useSelector } from 'react-redux';
import { DecreaseIcon, DeleteIcon, EditIcon, IncreaseIcon } from '../../../../Icons';
import { RootState, updateTask } from '../../../../../store/reducer';
import { createPortal } from 'react-dom';
import { DeleteItem } from './DeleteItem';
import { Dispatch, SetStateAction, useState } from 'react';
import { node } from '../../../../Timer';
import { formatMessage } from 'devextreme/localization';


interface IMenuList {
  id: string;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

export function MenuList({ id, setIsEditable, setIsDropdownOpen }: IMenuList) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const timerState = useSelector<RootState, string>(state => state.timer.timerState);
  const dispatch = useDispatch();

  function handleDecClick() {
    setIsDropdownOpen(false);
    dispatch(updateTask(id, 'dec'));
  }

  function handleIncClick() {
    setIsDropdownOpen(false);
    dispatch(updateTask(id, 'inc'));
  }

  function handleEditClick() {
    setIsDropdownOpen(false);
    setIsEditable(true);
    document.getElementById(id)?.focus();
  }
  
  return (
    <>
      <ul className='menuList'>
        <li>
          <button  className='menuItem' onClick={ handleIncClick }>
            <IncreaseIcon />
            { formatMessage('Increase') }
          </button>
        </li>

        <li>
          <button  className='menuItem' onClick={ handleDecClick }>
            <DecreaseIcon />
            { formatMessage('Decrease') }
          </button>
        </li> 

        <li>
          <button  className='menuItem' onClick={ handleEditClick }>
            <EditIcon />
            { formatMessage('Edit') }
          </button>
        </li>

        <li>
          <button className={timerState === 'Active' || timerState === 'Break' ? 'menuItem disabled' : 'menuItem' } onClick={() => { setIsDeleteOpen(true) }}>
            <DeleteIcon />
            { formatMessage('Delete') }
          </button>
        </li>
      </ul>

      {createPortal ((
        <DeleteItem id={id} isOpen={isDeleteOpen} setIsOpen={ setIsDeleteOpen } />
      ), node)}
    </>
  );
}