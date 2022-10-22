import React from 'react'

function Alert({msg}) {
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
            ""
      }
    </div>
  )
}

export default Alert