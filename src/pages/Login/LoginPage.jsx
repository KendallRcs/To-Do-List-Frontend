import React from 'react'
import Login from '../../components/Login/Login'
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth'
import toast, { Toaster } from 'react-hot-toast';

const LoginPage = () => {

  const navigate = useNavigate()
  
  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials)
      console.log(response.data)
      toast.success('Logueado correctamente')
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/dashboard')
    } catch (error) {
      toast.error("Usuario o contraseña incorrectos")
      console.error("ERROasR", error)
    }
  }

  return (
    <div>
      <Login onLogin={handleLogin} />
      <Toaster />
    </div>

  )
}

export default LoginPage