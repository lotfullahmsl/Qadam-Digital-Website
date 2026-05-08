import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import { UserAuthProvider } from './context/UserAuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserAuthProvider>
          <LanguageProvider>
            <AppRoutes />
          </LanguageProvider>
        </UserAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
