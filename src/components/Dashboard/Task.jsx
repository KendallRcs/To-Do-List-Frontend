import React from 'react'
import './Task.css'
const Task = (props) => {
  return (
    <div className='card'>
      <h2>{props.task.title}</h2>
      <p>{props.task.description}</p>
      <p>{props.task.status}</p>
    </div>
  )
}

export default Task