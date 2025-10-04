import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const PageView = ({ children, title, showFooter, className }) => {
  return (
     <div className={`flex flex-col min-h-screen bg-white text-gray-800 ${className}`}>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
        <Header />
      </header>

      {/* Main Content (padding top accounts for fixed header) */}
      <main className="flex-grow container mx-auto px-4 pt-24 pb-20">
        {title && <h1 className="sr-only">{title}</h1>}
        {children}
      </main>

      {/* Optional Footer */}
      {showFooter && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  )
}

export default PageView
