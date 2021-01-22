import { Route, Switch } from 'react-router-dom';
import 'modern-normalize/modern-normalize.css';

import Navigation from './Components/Navigation';
import './App.css';

import HomeView from './views/HomeView';
import MoviesView from './views/MoviesView';
import MovieOverview from './views/MovieOverviewView';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>

        <Route path="/movies" exact>
          <MoviesView />
        </Route>

        <Route path="/movies/:movieID">
          <MovieOverview />
        </Route>

        <Route>
          <HomeView />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
