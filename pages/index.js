import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from '../components/Layout'
import Task from '../components/Task'
import styles from '../styles/Layout.module.css'
import { API_URL } from '../config/index'
import { useRouter } from 'next/router'

export default function Home({ data, totalCount, page, sort_direction, sort_field }) {
  const [showForm, setShowForm] = useState(false)
  const lastPage = Math.ceil(totalCount / 3)

  const setURL = (page=page, sort_direction=sort_direction, sort_field=sort_field) => {
    return `/?page=${page}&sort_direction=${sort_direction}&sort_field=${sort_field}`
  }
  const router = useRouter()

  return (
    <Layout>
      <h1>Задачник</h1>

      <div className={styles.linkcontainer}>
        <Link href='/add'>
          <a className='btn'>Новая задача</a>
        </Link>

        <p>Сортировать по:</p>
        <p>
          <Link href={`/?sort_direction=desc`}>↓</Link>
          <Link href={`/?sort_direction=asc`}>↑</Link>
        </p>

        <div>
          <p>
            <Link href={`/?sort_field=username`}>Имени</Link>
            <Link href={`/?sort_field=email`}>Email</Link>
            <Link href={`/?sort_field=status`}>Status</Link>
            <Link href={`/?sort_field=id`}>ID</Link>
          </p>
        </div>

      </div>

      {data.map(task => (
        <Task key={task.id} task={task} />
      ))}

      {page > 1 && (
        <Link href={`${setURL(page-1, sort_direction, sort_field)}`}>
          <a className='btn-secondary'>Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`${setURL(page+1, sort_direction, sort_field)}`}>
          <a className='btn-secondary'>Next</a>
        </Link>
      )}
      
    </Layout>
  )
}

export async function getServerSideProps({ query: {page=1, sort_direction='asc', sort_field='id'} }) {

  const res = await fetch(`${API_URL()}&page=${page}&sort_direction=${sort_direction}&sort_field=${sort_field}`)
  const data = await res.json()

  return {
    props: {
      totalCount: data.message.total_task_count,
      data: data.message.tasks,
      page: +page,
      sort_direction,
      sort_field
    }
  }
}
