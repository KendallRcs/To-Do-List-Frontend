import React from 'react'
import { useState, useEffect } from 'react'
import { getTasks, createTask, editTask, deleteTask } from '../../api/tasks'
import Task from './Task'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FormGroup } from 'react-bootstrap';

const Dashboard = () => {

  const navigate = useNavigate();
  const [tasks, setTasks] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [newTask, setNewTask] = useState({title: "", description: "", status: "pendiente"})

  const resetForm = () => {
    setNewTask({title: "", description: "", status: "Pendiente"})
  }
  const handleClose = () => {
    setShowModal(false);
    resetForm()
  }
  const handleShow = () => setShowModal(true);
  const handleChangeNewTask = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    })
  }

  const getData = async() => {
    try{
      const token = localStorage.getItem('token')
      const response = await getTasks(token)
      if(response.status === 200) {
        const responseData = response.data || []; 
        setTasks(responseData)
      }
    } catch(error) {
      if(error.response && error.response.status === 401) {
        toast.error("Sesión Expirada")
        navigate('/login')
      }else{
        toast.error("Error al obtener tareas", error)
      }
    }
  }

  const saveTask = () => {
    console.log("SAVE TASK", newTask)
    if(isEdit) {
      editNewTask()
      console.log("EDIT")
    } else {
      createNewTask()
      console.log("CREATE")
    }
  }

  const createNewTask = async () => {
    const token = localStorage.getItem('token')
    const response = await createTask(token, newTask)
    if(response.status === 201) {
      toast.success("Tarea creada")
      getData()
      handleClose()
    }
  }

  const editNewTask = async () => {
    const token = localStorage.getItem('token')
    const response = await editTask(token, newTask)
    if(response.status === 200) {
      toast.success("Tarea editada")
      getData()
      handleClose()
    }
  }

  const deleteNewTask = async (taskId) => {
    const token = localStorage.getItem('token')
    const response = await deleteTask(token, taskId)
    console.log("DELETE RESPONSE", response)
    if(response.status === 204) {
      toast.success("Tarea eliminada")
      getData()
    }
  }

  const handleEdit = (task) => {
    console.log("EDIT", task)
    setNewTask(task)
    setIsEdit(true)
    handleShow()
  }

  const handleDelete = (task) => {
    console.log("DELETE", task)
    deleteNewTask(task.id)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      Dashboard

      <Button variant="primary" onClick={() => {handleShow(); setIsEdit(false)}}>
        Crear task
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Editar Tarea" : "Crear Tarea"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Título</Form.Label>
              <Form.Control name="title" value={newTask.title} onChange={handleChangeNewTask} type="text" placeholder="Título" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Descripción</Form.Label>
              <Form.Control name="description" value={newTask.description} onChange={handleChangeNewTask} as="textarea" rows={3} />
            </Form.Group>
            <FormGroup className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Check name="status" value="Pendiente" checked={newTask.status === "Pendiente"} onChange={handleChangeNewTask} className='mb-3' type="radio" label="Pendiente" id="Pendiente"/>
              <Form.Check name="status" value="En Progreso" checked={newTask.status === "En Progreso"} onChange={handleChangeNewTask} className='mb-3' type="radio" label="En Progreso" id="En Progreso"/>
              <Form.Check name="status" value="Completado" checked={newTask.status === "Completado"} onChange={handleChangeNewTask} className='mb-3' type="radio" label="Completado" id="Completado"/>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => saveTask()}>
            {isEdit ? "Editar" : "Crear"}
          </Button>
        </Modal.Footer>
      </Modal>

      {tasks.length === 0 
      ? <p>No hay tareas</p>
      : tasks.map(task => (
        <Task key={task.id} task={task} handleEdit={() => handleEdit(task)} handleDelete={()=> handleDelete(task)}/>
      ))}
      <Toaster />

    </div>
  )
}

export default Dashboard