import React, { createContext, useState, useEffect } from 'react'

export const UserAuthContext = createContext()

export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('user_token')
    const userData = localStorage.getItem('user_data')
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch {
        localStorage.removeItem('user_token')
        localStorage.removeItem('user_data')
      }
    }
    setLoading(false)
  }, [])

  const loginUser = (token, userData) => {
    localStorage.setItem('user_token', token)
    localStorage.setItem('user_data', JSON.stringify(userData))
    setUser(userData)
  }

  const logoutUser = () => {
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_data')
    setUser(null)
  }

  return (
    <UserAuthContext.Provider value={{ user, loginUser, logoutUser, loading, isLoggedIn: !!user }}>
      {children}
    </UserAuthContext.Provider>
  )
}
