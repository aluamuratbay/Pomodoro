import './taskForm.css';
import {  useDispatch } from 'react-redux';
import { updateTaskList } from '../../store/reducer';
import { ChangeEvent, FormEvent, useState } from 'react';
import { formatMessage } from 'devextreme/localization';

export function TaskForm() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    if(value !== '') {
      dispatch(updateTaskList(value));
      setValue('');
    }
  }

  return (
    <form className='taskForm' onSubmit={handleSubmit}>
      <input type="text" className='taskInput' placeholder={formatMessage('Task Name')} onChange={handleChange} value={value}/>
      <button className='taskBtn' type='submit'>{ formatMessage('Add') }</button>
    </form>
  );
}
