import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { API_URL } from '../../config/index'
import styles from '../../styles/FormEdit.module.css'
import cookie from 'cookie'

export default function EditTask({ text, token }) {
  console.log(`${API_URL(`edit/${text.id}`)}`)
  console.log(token)
  
  const [check, setCheck] = useState(text.status === '10' || text.status === '11')
  
  const [values, setValues] = useState({
    status: text.status,
    text: text.text,
  })
  
  // instantiate router to go back
  const router = useRouter()
  
  const handleCheck = () => {
    setCheck(!check)
  }
  
  console.log('check', check)

  const handleInputChange = e => {
    const {name, value} = e.target
    setValues({ ...values, [name]: value })
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
      
      /*
      text - тестовое поле - текст задачи
      status - числовое поле - текущее состояние задачи
      0 - задача не выполнена
      1 - задача не выполнена, отредактирована админом
      10 - задача выполнена
      11 - задача отредактирована админом и выполнена
      */

    // conditional check for status
    if (values.text === text.text && check === true) {
      setValues({ ...values, status: '10'})
    } else if (values.text !== text.text && check === true) {
      setValues({ ...values, status: '11'})
    } else if (values.text !== text.text && check === false) {
      setValues({ ...values, status: '1'})
    } else {
      setValues({ ...values, status: '0'})
    }

    // form
    const formData = new FormData()
    formData.append("text", values.text)
    formData.append("status", values.status)

    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${token}`)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: formData,
      mode: 'no-cors',
      crossDomain: true
    }
  
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


  function parseCookies(req) {
    return cookie.parse(req ? req.headers.cookie || '' : '')
  }

  const {token} = parseCookies(req)

  return {
    props: {
      text: query,
      token
    }
  }
}