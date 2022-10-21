import React from 'react'

function About() {
  return (
    <div className='container-about'>
      <div className="container-interno-about">

        <div className="container-about-one">
          <div className='container-img-about'>
            <img src="" alt="Imagen Uno" className="img-about" />
          </div>
          <div className="container-text-about">
            <h2>¿About Us?</h2>
            <p className="text-about">lorem ipsum dolor</p>
          </div>
        </div>

        <div className="container-about-two">
          <div className="container-text-about">
            <h2>¿About Us?</h2>
            <p className="text-about">lorem ipsum dolor</p>
          </div>
          <div className='container-img-about'>
            <img src="" alt="Imagen two" className="img-about" />
          </div>
        </div>

        <div className="container-about-three">
          <div className='container-img-about'>
            <img src="" alt="Imagen three" className="img-about" />
          </div>
          <div className="container-text-about">
            <h2>¿About Us?</h2>
            <p className="text-about">lorem ipsum dolor</p>
          </div>
        </div>

      </div>{/* fin container interno */}
    </div>
  )
}

export default About