import { lazy, Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';
import 'modern-normalize/modern-normalize.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Spinner from './Components/Spinner';
import Navigation from './Components/Navigation';
import './App.css';
import routes from './routes';

const HomeView = lazy(() =>
  import('./views/HomeView.js' /* webpackChunkName: "HomeView"*/),
);
const MoviesView = lazy(() =>
  import('./views/MoviesView.js' /* webpackChunkName: "MoviesView"*/),
);
const MovieOverview = lazy(() =>
  import('./views/MovieOverviewView.js' /* webpackChunkName: "MovieOverview"*/),
);

function App() {
  return (
    <div className="App">
      <Navigation />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path={routes.home} exact>
            <HomeView />
          </Route>

          <Route path={routes.movies} exact>
            <MoviesView />
          </Route>

          <Route path={routes.movieDetails}>
            <MovieOverview />
          </Route>

          <Route>
            <HomeView />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
