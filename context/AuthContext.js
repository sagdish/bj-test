import { useRouter } from 'next/router'
import { useEffect, createContext, useState } from 'react'
import { NEXT_URL, API_URL } from '../config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // login
  const login = async ({username, password}) => {
    // console.log({username, password})
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    const data = await res.json()

    console.log('next api response', data)

    if (res.ok) {
      // console.log()
    }

  }

  // logout
  const logout = async () => {
    console.log('logged out')
    setUser(null)
  }

  // check if admin loged in
  const userLoggedIn = async (user) => {
    console.log('check')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, userLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext