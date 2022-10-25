import React from 'react'
import { Link } from 'react-router-dom';

function Alert({msg, name}) {
  return (
    <div className='container-alert'>
      {
        msg === 'There are empty fields' ?
          <div className='container-error'>
            <h2 className='text-alert'>{msg}</h2>
          </div>
          :
          msg === 'Activity Created' ?
            <div className='container-success'>
              <h2>{msg}</h2>
            </div>
            :
            msg === "Activity already exists" ?
              <div className='container-exists'>
                <h2>{msg}. <Link to={`/update/${name}`}>Do you want to modify?</Link></h2>
              </div>
              :
              msg === "Activity Modify" ?
                <div className='container-success'>
                  <h2>{msg}</h2>
                </div>
                :
                msg === "Message send" ?
                  <div className='container-success'>
                    <h2>{msg}</h2>
                  </div>
                  :
                  msg === "Invalid email" ?
                    <div className='container-error'>
                      <h2 className='text-alert'>{msg}</h2>
                    </div>
                    :""
      }
    </div>
  )
}

export default Alert