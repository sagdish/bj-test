import Link from 'next/link'
import styles from '../styles/Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>BeeJee</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <a className='btn-secondary'>Admin Login</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
