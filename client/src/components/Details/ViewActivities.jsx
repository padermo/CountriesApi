import React from 'react'

function ViewActivities({ activities }) {
  // activities is array
  return (
    <div>
      {
        activities.length ?
          activities.map(e => (
            <div key={e.id}>
              <ul>
                <li>Activity {e.name.slice(0, 1).toUpperCase().concat(e.name.slice(1))}</li>
                <li>Difficulty: {e.difficulty}</li>
                <li>Duration: {e.duration}</li>
                <li>Season: {e.season}</li>
              </ul>
            </div>
          ))
          :
          ""
      }
    </div>
  )
}

export default ViewActivities