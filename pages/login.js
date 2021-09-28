import { useState, useEffect, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaUser } from 'react-icons/fa'
import Link from 'next/link'
import AuthContext from '../context/AuthContext'
import Layout from '../components/Layout'
import styles from '../styles/LoginForm.module.css'

export default function login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login, error } = useContext(AuthContext)

  useEffect(() => error && toast.error(error))

  const handleSubmit = e => {
    e.preventDefault()
    login({username, password})
    setUsername('')
    setPassword('')
  }

  return (
    <Layout title='User login'>
      <div className={styles.auth}>
        <h2>
          <FaUser /> Log In
        </h2>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='user'>Username</label>
            <input type='text' id='user' value={username} 
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' value={password} 
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <input type='submit' value='Login' className='btn' />
        </form>
      </div>
    </Layout>
  )
}
