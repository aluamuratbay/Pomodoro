import './task.css';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../../store/reducer';
import { Menu } from './Menu';
import { ChangeEvent, useRef, useState } from 'react';

interface ITask {
  id: string;
  amount: number;
  name: string;
}

export function Task({ id, amount, name}: ITask) {
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(updateTask(id, event.target.value));
  }

  document.getElementById(id)?.addEventListener('focusout', () => {
      setIsEditable(false);
  });

  return (
    <li className='taskItem'>
      <span className='taskTomato'>
        { amount }
      </span>
      <span ref={ref}>
        <input 
          className={isEditable? 'taskName taskNameEditable' : 'taskName'} 
          id={id} 
          value={name} 
          onChange={isEditable? handleChange : () => {} }
          readOnly={isEditable? false : true}
        />
      </span>
      <Menu id={id} setIsEditable={setIsEditable}/>
    </li>
  );
}