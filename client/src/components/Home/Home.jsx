import React from 'react'
import Activity from '../Activities/Activity';
import Detail from '../Details/Detail';
import Countries from '../Countries/Countries';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import About from '../About/About';
import Update from '../UpdateActivity/Update';

function Home() {
  return (
    <div className='container-home'>
      <Header />
      <Route exact path={'/'} render={()=> <About/>} />
      <Route exact path={'/countries'} render={() => <Countries />} />
      <Route exact path={'/activities'} render={() => <Activity />} />
      <Route exact path={'/countries/:id'} render={({ match }) => <Detail match={match} />} />
      <Route exact path={'/update/:name'} render={({ match }) => <Update match={match} />} />
      <Footer/>
    </div>
  )
}

export default Home