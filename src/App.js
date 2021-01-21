import { Route } from 'react-router-dom';

import Navigation from './Navigation';
import './App.css';

import HomeView from './views/HomeView';

function App() {
  return (
    <div className="App">
      <Navigation />

      <Route path="/">
        <HomeView />
      </Route>
    </div>
  );
}

export default App;
