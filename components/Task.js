import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Task.module.css'

export default function Task({task}) {

  /*
    0 задача не выполнена
    1 - задача не выполнена, отредактирована админом
    10 - задача выполнена
    11 - задача отредактирована админом и выполнена
  */
  // let status = {done: false, edited: false}
  // if (task.status === 10 || task.status === 11) {
  //   status.done = true
  // } else if (task.status === 1) {

  // }

  const [curTask, setCurTask] = useState(task)

  const status = task.status
  
  // console.log('task ', task)

  return (
    <div className={styles.task}>

      <div className={styles.img}>
        <Image src={task.image_path? task.image_path : '/todo.jpeg'} 
          width={90} height={70}
        />
      </div>

      <div className={styles.info}>
        <span>
          {task.email}
        </span>
        <p>{task.username}</p>
        <h4>{task.text}</h4>
        <p>Статус: {task.status !== 0 ? '✅' : '🚫'}</p>
        {(task.status === 11 || task.status === 1) && <p>{'Отредактирована Админом'}</p>} 
      </div>

      <div>
        <Link href={{
          pathname: `/edit/${task.id}`, 
          query: {id: task.id, text: task.text, status: task.status}
        }}> 
          <button className='btn' style={{opacity: '0.7'}}> <FaEdit /></button>
        </Link>
      </div>
    </div>
  )
}
