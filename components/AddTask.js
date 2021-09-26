import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '../config/index'
import styles from '../styles/Form.module.css'

export default function AddTask({visible, handle}) {
  const [values, setValues] = useState({
    username: '',
    email: '',
    text: '',
  })

  const handleSubmit = async e => {
    e.preventDefault()
    // console.log(values)

    // Validation:
    const hasEmptyFields = Object.values(values).some(
      field => field === ''
    )
    if (hasEmptyFields) {
      toast.error('Пожалуйста заполните все поля')
      return
    }
    // console.log(values)

    const formData = new FormData();

    let res;
    if (values.username.length > 2 && values.email.includes('@') && values.text.length > 2) {
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("text", values.text);

      res = await fetch(`${API_URL('create')}`, {
        method: 'POST',
        body: formData
      })
    } else {
      toast.error('Пожалуйста заполните все поля или добавьте больше символов')
      return
    }

    setValues({
      username: '',
      email: '',
      text: ''
    })

    if (res.status === 'error') {
      toast.error('Что-то пошло не так')
    } else {
      toast.success('Задача добавлена')
    }
  }

  const handleInputChange = e => {
    const {name, value} = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <>{visible && <div>
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
    </div>}
    </>
  )
}
