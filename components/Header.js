import Link from 'next/link'
import styles from '../styles/Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a>BeeJee</a>
      </div>

      <nav>
        <ul>
          <li>
            <a>Admin Login</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
