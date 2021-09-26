import { useState } from 'react'
import Layout from '../components/Layout'
import Task from '../components/Task'
import AddTask from '../components/AddTask'
import { API_URL } from '../config/index'

export default function Home({data, raw}) {
  const [showForm, setShowForm] = useState(false)

  console.log(raw)
  return (
    <Layout>
      <h1>Задачник</h1>

      {data.map(task => (
        <Task key={task.id} task={task} />
      ))}

      <AddTask visible={showForm} handle={setShowForm} />
      <div className='btn'
        onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Закрыть поля' : 'Новая задача'}
      </div>

    </Layout>
  )
}

export async function getServerSideProps() {
  // console.log(API_URL())
  const res = await fetch(`${API_URL()}&page=2`)
  const data = await res.json()

  console.log(data)

  return {
    props: {
      raw: data,
      data: data.message.tasks
    }
  }
}
