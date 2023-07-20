import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import './notification.css';

interface INotification {
  isOpen: boolean,
  timerState: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function Notification({ isOpen, timerState, setIsOpen }: INotification) {
  const close = useCallback(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  }, [setIsOpen]);

  useEffect(() => {
    if(isOpen) close();
  }, [isOpen, close])

  return (
    <div className={ isOpen ? "notification active" : "notification" } style={timerState === 'Break' ? { backgroundColor: 'var(--blue96)' } : { backgroundColor: 'var(--green17)'}}>
      { timerState === 'Break' ? 'Помидор окончен · Сделайте короткий перерыв.' : 'Перерыв окончен · Начните следующий помидор.' }
    </div>
  );
}