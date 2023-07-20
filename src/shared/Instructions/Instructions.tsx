import './instructions.css';

export function Instructions() {
  return (
    <div className="instructions">
      <h2 className="instructionsTitle">Ура! Теперь можно начать работать:</h2>
      <ul className="instructionsList">
        <li className="instructionsItem">
          Выберите категорию и&nbsp;напишите название текущей задачи
        </li>
        <li className="instructionsItem">
          Запустите таймер (&laquo;помидор&raquo;)
        </li>
        <li className="instructionsItem">
          Работайте пока &laquo;помидор&raquo; не&nbsp;прозвонит
        </li>
        <li className="instructionsItem">
          Сделайте короткий перерыв (3-5&nbsp;минут)
        </li>
        <li className="instructionsItem">
          Продолжайте работать &laquo;помидор&raquo; за&nbsp;&laquo;помидором&raquo;, пока задача не&nbsp;будут выполнена. Каждые 4&nbsp;&laquo;помидора&raquo; делайте длинный перерыв (15-30&nbsp;минут).
        </li>
      </ul>
    </div>
  );
}