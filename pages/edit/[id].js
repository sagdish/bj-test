import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { API_URL } from '../../config/index'
import styles from '../../styles/FormEdit.module.css'
import { parseCookies } from '../../config/helpers'

export default function EditTask({ text, token }) {
  
  const [values, setValues] = useState({
    status: Number(text.status),
    text: text.text,
  })
  
  const [check, setCheck] = useState(values.status === 10 || values.status === 11)
  
  // instantiate router to go back
  const router = useRouter()
  
  const handleCheck = () => {
    setCheck((check) => !check)
    statusChange()
  }
  useEffect(() => {
    statusChange()
  }, [check])
  
  const statusChange = () => {
     // conditional check for status
    if (values.text === text.text && check === true) {
      setValues(state => ({ ...state, status: 10}))
    } else if (values.text !== text.text && check === true) {
      setValues(state => ({ ...state, status: 11}))
    } else if (values.text !== text.text && check === false) {
      setValues(state => ({ ...state, status: 1}))
    } else if (values.text === text.text && check === false) {
      setValues(state => ({ ...state, status: 0}))
    }
  }

  const handleInputChange = e => {
    if (e && e.target.name) {
      const {name, value} = e.target
      setValues({ ...values, [name]: value })
    }
    statusChange()
  }
  
  const handleSubmit = async e => {
    e.preventDefault()

    // Validation:
    const hasEmptyFields = Object.values(values).some(
      field => field === ''
    )
    if (hasEmptyFields) {
      toast.error('Пожалуйста заполните все поля')
      return
    } else if (values.text.length < 1) {
      toast.error('Пожалуйста добавьте больше символов')
      return
    }

    // form
    const formdata = new FormData()
    formdata.set("text", values.text)
    formdata.set("status", values.status)
    formdata.set('token', token)

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
  
    const res = await fetch(`${API_URL(`edit/${text.id}`)}`, requestOptions)
    const data = await res.json()

    if (data.status === 'error') {
      toast.error(JSON.stringify(data.message))
    } else if (data.status === 'ok') {
      toast.success('Задача поправлена! Идем назад к списку...')
      setTimeout(() => router.back(), 1200)
    } else {
      toast.error('unknown error')
    }
  }

  return (
    <Layout>
      <h3>Изменить задачу</h3>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div>
          <label htmlFor='check'>Выполнена?</label>
          <input
            name="check"
            type='checkbox'
            checked={check}
            onChange={handleCheck}
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
        <input type='submit' value='Изменить задачу' className='btn' />
      </form>
    </Layout>
  )
}

export async function getServerSideProps({query, req}) {
  const {token} = parseCookies(req)

  return {
    props: {
      text: query,
      token: token === undefined ? null : token
    }
  }
}