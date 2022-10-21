import React from 'react'

function ViewActivities({ activities }) {
  // activities is array
  return (
    <div className='container-viewactivities'>
      {
        activities.length ?
          activities.map(e => (
            <div key={e.id} className='container-list-view'>
              <ul className='list-view'>
                <li>Activity: <span>{e.name.slice(0, 1).toUpperCase().concat(e.name.slice(1))}</span></li>
                <li>Difficulty: <span>{e.difficulty}</span></li>
                <li>Duration: <span>{e.duration} Hrs</span></li>
                <li>Season: <span>{e.season}</span></li>
              </ul>
            </div>
          ))
          :
          <div className='no-activities'>
            <p>No Activities</p>
          </div>
      }
    </div>
  )
}

export default ViewActivities