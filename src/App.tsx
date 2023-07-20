import './App.css';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { Instructions } from './shared/Instructions';
import { TaskForm } from './shared/TaskForm';
import { Timer } from './shared/Timer';
import { Provider } from 'react-redux';
import { TaskList } from './shared/TaskList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Statistics } from './shared/Statistics';
import store, { persistor } from './persist';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
      </PersistGate>  
    </Provider>
  )
}

export default App;


/*
import './App.css';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { Instructions } from './shared/Instructions';
import { TaskForm } from './shared/TaskForm';
import { Timer } from './shared/Timer';
import { Provider } from 'react-redux';
import { TaskList } from './shared/TaskList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Statistics } from './shared/Statistics';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './persist';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  )
}

export default App;

*/

/*
import './App.css';
import { Header } from './shared/Header';
import { Content } from './shared/Content';
import { Instructions } from './shared/Instructions';
import { TaskForm } from './shared/TaskForm';
import { Timer } from './shared/Timer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './store';
import { composeWithDevTools } from 'redux-devtools-extension';
import { TaskList } from './shared/TaskList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const store = createStore(rootReducer, composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={
              <div className="App">
                <Content>
                <div className='appLeft'>
                    <Instructions />
                    <TaskForm />
                    <TaskList />
                  </div>
                <Timer />
                </Content>
              </div>
            } />
            <Route  path="/statistics">
              
            </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
*/