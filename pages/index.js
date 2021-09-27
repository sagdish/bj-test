import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '../components/Layout'
import Task from '../components/Task'
import AddTask from './add'
import { API_URL } from '../config/index'
import { useRouter } from 'next/router'

export default function Home({data, totalCount, page}) {
  const [showForm, setShowForm] = useState(false)
  const lastPage = Math.ceil(totalCount / 3)

  const router = useRouter()

  return (
    <Layout>
      <h1>Задачник</h1>

      <Link href='/add'>
        <a className='btn'>Новая задача</a>
      </Link>

      {data.map(task => (
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
