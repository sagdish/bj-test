import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '../components/Layout'
import Task from '../components/Task'
import AddTask from '../components/AddTask'
import { API_URL } from '../config/index'
import { useRouter } from 'next/router'

export default function Home({data, totalCount, page}) {
  const [showForm, setShowForm] = useState(false)
  const lastPage = Math.ceil(totalCount / 3)

  const router = useRouter()

  const [tasks, setTasks] = useState(data)
  console.log('tasks: ', tasks, 'data :', data)
  console.log(tasks.length)
  console.log('total count :', totalCount)


  // do smth with this!
  // that's better!
  useEffect(() => {
    setTasks(data)
  }, [data])

  const updateState = newTask => {
    if (tasks.length < 3) {
      setTasks(state => [...state, newTask])
    } else {
      setTasks(data)
    }
    toast.success('Задача добавлена')
  }

  return (
    <Layout>
      <h1>Задачник</h1>

      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}

      {page > 1 && (
        <Link href={`/?page=${page - 1}`}>
          <a className='btn-secondary'>Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/?page=${page + 1}`}>
          <a className='btn-secondary'>Next</a>
        </Link>
      )}

      <br/>
      <AddTask
        visible={showForm}
        handle={setShowForm}
        updateState={updateState}
      />
      <div className='btn space'
        onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Свернуть поля' : 'Новая задача'}
      </div>
      
    </Layout>
  )
}

export async function getServerSideProps({ query: {page = 1} }) {
  // console.log(API_URL())

  const res = await fetch(`${API_URL()}&page=${page}`)
  const data = await res.json()

  console.log(data)

  return {
    props: {
      totalCount: data.message.total_task_count,
      data: data.message.tasks,
      page: +page,
    }
  }
}
