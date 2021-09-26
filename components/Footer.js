import Link from 'next/link'
import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Made by Sagdi &copy; 2021</p>
      <p> 
        <Link href='https://sagdi.com'>About Me</Link>
      </p>      
    </footer>
  )
}
