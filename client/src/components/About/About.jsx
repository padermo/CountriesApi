import React from 'react'
import imgUno from '../../resources/about-uno.jpg'
import imgDos from '../../resources/about-dos.jpg'
import imgTres from '../../resources/about-tres.jpg'

function About() {
  return (
    <div className='container-about'>
      <div className="container-interno-about">

        <div className="container-about-one">
          <div className='container-img-about'>
            <img src={imgDos} alt="Imagen Uno" className="img-about" />
          </div>
          <div className="container-text-about">
            <h2>¿About Us?</h2>
            <p className="text-about">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit amet est placerat. Tempus iaculis urna id volutpat lacus. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Volutpat diam ut venenatis tellus in metus vulputate eu. Nisl vel pretium lectus quam id leo in. Aliquam purus sit amet luctus. Eget aliquet nibh praesent tristique magna sit. Mollis nunc sed id semper risus. Nisl suscipit adipiscing bibendum est. Felis donec et odio pellentesque diam volutpat commodo sed. Erat pellentesque adipiscing commodo elit at imperdiet dui.</p>
          </div>
        </div>

        <div className="container-about-two">
          <div className="container-text-about">
            <h2>Trevel</h2>
            <p className="text-about">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit amet est placerat. Tempus iaculis urna id volutpat lacus. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Volutpat diam ut venenatis tellus in metus vulputate eu. Nisl vel pretium lectus quam id leo in. Aliquam purus sit amet luctus. Eget aliquet nibh praesent tristique magna sit. Mollis nunc sed id semper risus. Nisl suscipit adipiscing bibendum est. Felis donec et odio pellentesque diam volutpat commodo sed. Erat pellentesque adipiscing commodo elit at imperdiet dui.</p>
          </div>
          <div className='container-img-about'>
            <img src={imgUno} alt="Imagen two" className="img-about" />
          </div>
        </div>

        <div className="container-about-three">
          <div className='container-img-about'>
            <img src={imgTres} alt="Imagen three" className="img-about" />
          </div>
          <div className="container-text-about">
            <h2>Activities</h2>
            <p className="text-about">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui ut ornare lectus sit amet est placerat. Tempus iaculis urna id volutpat lacus. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Volutpat diam ut venenatis tellus in metus vulputate eu. Nisl vel pretium lectus quam id leo in. Aliquam purus sit amet luctus. Eget aliquet nibh praesent tristique magna sit. Mollis nunc sed id semper risus. Nisl suscipit adipiscing bibendum est. Felis donec et odio pellentesque diam volutpat commodo sed. Erat pellentesque adipiscing commodo elit at imperdiet dui.</p>
          </div>
        </div>

      </div>{/* fin container interno */}
    </div>
  )
}

export default About