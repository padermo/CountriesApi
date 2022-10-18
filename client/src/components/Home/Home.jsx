import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Link to={'/countries'}>Entrar</Link>
    </div>
  )
}

export default Home