import './deleteItem.css';
import { Dispatch, SetStateAction } from 'react';
import { CrossIcon } from '../../../../../Icons';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../../../../../reducer';

interface IDeleteItem {
  id: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function DeleteItem({ id, isOpen, setIsOpen }: IDeleteItem) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(deleteTask(id));
    setIsOpen(false);
  }

  return (
    <>
    {isOpen &&
      <div className='modalWrap'>
      <div className='modalContent'>
        <h2 className='deleteTitle'>Удалить задачу?</h2>
        <button className='deleteBtn' onClick={handleClick}>Удалить</button>
        <button className='cancelBtn' onClick={() => setIsOpen(false)}>Отмена</button>
        <button className='collapseBtn'  onClick={() => setIsOpen(false)}>
          <CrossIcon />
        </button>
      </div>
    </div>
    }
    </>
  );
}