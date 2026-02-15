import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
    <main className="flex justify-center p-20 min-h-screen w-full"> 

      {children} 
    
    </main>
  )
}

export default Layout