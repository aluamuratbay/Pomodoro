import { formatMessage } from 'devextreme/localization';
import './instructions.css';

export function Instructions() {
  return (
    <div className="instructions">
      <h2 className="instructionsTitle">{ formatMessage("Hooray! Now we can start working") }:</h2>
      <ul className="instructionsList">
        <li className="instructionsItem">
          { formatMessage('Select a category and write the name of the current task') }
        </li>
        <li className="instructionsItem">
          { formatMessage('Start the timer (pomodoro)') }
        </li>
        <li className="instructionsItem">
          { formatMessage('Work until the «pomodoro» rings') }
        </li>
        <li className="instructionsItem">
          { formatMessage('Take a short break (3-5 minutes)') }
        </li>
        <li className="instructionsItem">
          { formatMessage('Continue working «pomodoro» after «pomodoro» until the task is completed. Take a long break (15-30 minutes) every 4 Pomodoros') }.
        </li>
      </ul>
    </div>
  );
}