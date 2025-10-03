import './App.css';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { Instructions } from './shared/Instructions';
import { TaskForm } from './shared/TaskForm';
import { Timer } from './shared/Timer';
import { TaskList } from './shared/TaskList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Statistics } from './shared/Statistics';
import { useAppContext } from './store/AppState';
import { locale } from 'devextreme/localization';

function App() {
  const { language } = useAppContext();
  locale(language);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={
              <>
                <div className='appLeft'>
                  <Instructions />
                  <TaskForm />
                  <TaskList />
                </div>
                <Timer />
              </> 
            } />
            <Route  path="/statistics" element={<Statistics />}/>
          </Routes>
        </Content>
      </div>
    </BrowserRouter>
  )
}

export default App;