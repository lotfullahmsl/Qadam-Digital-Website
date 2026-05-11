import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const adminData = localStorage.getItem('admin_data')
    if (token && adminData) {
      setAdmin(JSON.parse(adminData))
    }
    setLoading(false)
  }, [])

  const login = (token, adminData) => {
    localStorage.setItem('admin_token', token)
    localStorage.setItem('admin_data', JSON.stringify(adminData))
    setAdmin(adminData)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_data')
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  )
}
