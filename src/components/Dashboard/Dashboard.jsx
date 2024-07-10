import React from 'react'
import { useState, useEffect } from 'react'
import { getTasks } from '../../api/tasks'
import Task from './Task'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Dashboard = () => {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState([])
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(async () => {
    const token = localStorage.getItem('token')
    const response = await getTasks(token)
    console.log("RESPONSE", response)
    if(response.data.error == "Invalid token") {
      toast.error("Sesión Expirada")
      navigate('/login')
    }
    if(response.status === 200) {
      console.log("RESPUESTA", response)
      const responseData = response.data || []; 
      setTasks(responseData)
    }
  }, [])

  return (
    <div>
      Dashboard

      <Button variant="primary" onClick={handleShow}>
        Crear task
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {tasks.length == 0 
      ? <p>No hay tareas</p>
      : tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
      <Toaster />

    </div>
  )
}

export default Dashboard