import Layout from '../components/Layout'
import Task from '../components/Task'
import { API_URL } from '../config/index'

export default function Home({data}) {
  return (
    <Layout>
      <div>
        <h1>You're awesome!</h1>

        {data.map(task => (
          <Task key={task.id} task={task} />
        ))}

        {/* <pre>
          <code>{JSON.stringify(data, null, 4)}</code>
        </pre> */}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  // console.log(API_URL())
  const res = await fetch(`${API_URL()}&page=1`)
  const data = await res.json()

  console.log(data)

  return {
    props: {
      data: data.message.tasks
    }
  }
}
