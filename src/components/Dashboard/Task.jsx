import React from 'react'
import './Task.css'
import { Button } from 'react-bootstrap'
const Task = (props) => {
  return (
    <div className='card'>
      <div>
        <h2>{props.task.title}</h2>
        <p>{props.task.description}</p>
        <p>{props.task.status}</p>
      </div>
      <Button variant="primary" onClick={props.handleEdit}>Editar</Button>
      <Button variant="danger" onClick={props.handleDelete}>Eliminar</Button>
    </div>
  )
}

export default Task