import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { API_URL } from '../config/index'
import styles from '../styles/Form.module.css'

export default function AddTask({visible, handle, updateState}) {
  const [values, setValues] = useState({
    username: '',
    email: '',
    text: '',
  })

  // instantiate router to go back
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()

    // Validation:
    const hasEmptyFields = Object.values(values).some(
      field => field === ''
    )
    if (hasEmptyFields) {
      toast.error('Пожалуйста заполните все поля')
      return
    } else if (values.username.length < 1 && !values.email.includes('@') && values.text.length < 2) {
      toast.error('Пожалуйста заполните все поля или добавьте больше символов')
      return
    }

    // form
    const formData = new FormData()
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("text", values.text);

    const res = await fetch(`${API_URL('create')}`, {
      method: 'POST',
      body: formData,
      crossDomain: true
    })

    const data = await res.json()

    setValues({
      username: '',
      email: '',
      text: ''
    })

    if (data.status === 'error') {
      toast.error(JSON.stringify(data.message))
    } else if (data.status === 'ok') {
      toast.success('Задача добавлена! Идем назад к списку...')
      setTimeout(() => router.back(), 1300)
    } else {
      toast.error('unknown error')
    }
  }

  const handleInputChange = e => {
    const {name, value} = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <Layout>
      <h3>Добавить задачу</h3>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor='name'>User Name</label>
          <input
            type='text'
            id='username'
            name='username'
            value={values.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='name'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={values.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor='name'>Text</label>
          <textarea
            type='text'
            id='text'
            name='text'
            value={values.text}
            onChange={handleInputChange}
          />
        </div>
        <input type='submit' value='Add Todo' className='btn' />
      </form>
    </Layout>
  )
}
