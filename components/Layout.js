import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/Layout.module.css'

export default function Layout({children}) {
  return (
    <div>
      <Head>
        <title>BeeJee test project</title>
        <meta name='description' content="BeeJee test project implemented by Sagdi" />
        <meta name='keywords' content='Next js, react, todo, tasks' />
      </Head>

      <Header />

      <div className={styles.container}>
        {children}
      </div>

      <Footer />
    </div>
  )
}
