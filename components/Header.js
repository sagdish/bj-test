import Link from 'next/link'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import styles from '../styles/Header.module.css'

export default function Header() {
  const {user, logout} = useContext(AuthContext)
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>BeeJee</a>
        </Link>
      </div>

      <nav>
        <ul>
          {user ? <>
            <li>
              <button 
                className='btn-secondary'
                onClick={() => logout()}
              >Logout
              </button>
            </li>
          </> : <>
            <li>
              <Link href='/login'>
                <a className='btn-secondary'>Admin Login</a>
              </Link>
            </li>
          </>}
        </ul>
      </nav>
    </header>
  )
}
