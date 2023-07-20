import './taskForm.css';
import {  useDispatch } from 'react-redux';
import { updateTaskList } from '../../reducer';
import { ChangeEvent, FormEvent, useState } from 'react';

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
      <input type="text" className='taskInput' placeholder='Название задачи' onChange={handleChange} value={value}/>
      <button className='taskBtn' type='submit'>Добавить</button>
    </form>
  );
}
