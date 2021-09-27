import Image from 'next/image'
import styles from '../styles/Task.module.css'

export default function Task({task}) {
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
      </div>


    </div>
  )
}
