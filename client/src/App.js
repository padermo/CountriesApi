import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/SearchBar/NavBar';
import Activity from './components/Activities/Activity';
import Detail from './components/Details/Detail';
import { Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Route exact path={'/'} render={() => <Home />} />
      <Route exact path={'/countries'} render={() => <NavBar />} />
      <Route exact path={'/activities'} render={() => <Activity />} />
      <Route exact path={'/countries/:id'} render={({ match }) => <Detail match={match} />} />
    </div>
  );
}

export default App;
