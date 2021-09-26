import Image from 'next/image'
import styles from '../styles/Task.module.css'

export default function Task({task}) {
  return (
    <div className={styles.task}>

      <div className={styles.img}>
        <Image src={task.image_path? task.image_path : '/todo.jpeg'} 
          width={170} height={120}
        />
      </div>

      <div className={styles.info}>
        <span>
          {task.email}
        </span>
        <h3>{task.username}</h3>
        <h3>{task.text}</h3>
      </div>


    </div>
  )
}
