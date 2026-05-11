import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from '../common/WhatsAppButton'

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
