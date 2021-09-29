import { FaEdit } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Task.module.css'

export default function Task({task, token}) {  
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
        <p>Статус: {(task.status === 10 || task.status === 11) ? '✅' : '🚫'}</p>
        {(task.status === 11 || task.status === 1) && <p>{'Отредактирована Админом'}</p>} 
      </div>

      {token && <div>
        <Link href={{
          pathname: `/edit/${task.id}`, 
          query: {id: task.id, text: task.text, status: task.status}
        }}> 
          <button className='btn' style={{opacity: '0.7'}}> <FaEdit /></button>
        </Link>
      </div>}
    </div>
  )
}
