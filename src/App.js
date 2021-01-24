import { Route, Switch } from 'react-router-dom';
import 'modern-normalize/modern-normalize.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

import Navigation from './Components/Navigation';
import './App.css';

import HomeView from './views/HomeView';
import MoviesView from './views/MoviesView';
import MovieOverview from './views/MovieOverviewView';
<Loader type="Circles" color="#00BFFF" height={80} width={80} />;
<Loader type="Circles" color="#00BFFF" height={80} width={80} />;

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
