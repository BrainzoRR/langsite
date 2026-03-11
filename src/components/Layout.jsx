import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children, title = '' }) {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Sidebar />
      <div className="ml-64 min-h-screen flex flex-col">
        <Header title={title} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
