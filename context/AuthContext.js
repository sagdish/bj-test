import { useRouter } from 'next/router'
import { useEffect, createContext, useState } from 'react'
import { toast } from 'react-toastify'
import { NEXT_URL, API_URL } from '../config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const router = useRouter()

  useEffect(() => userLoggedIn(), [])

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

    if (res.ok) {
      setUser("admin")
      router.push('/')
    } else {
      console.error(data)
      setError(data.message.password)
      setError(null)
    }

  }

  // logout
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST'
    })

    if (res.ok) {
      setUser(null)
      router.push('/')
    }
  }

  // check if admin loged in
  const userLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/admin`)
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
    } else {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, userLoggedIn, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext