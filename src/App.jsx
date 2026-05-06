import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import RdmJokes from './components/RdmJokes'
import RdmQuote from './components/RdmQuote'
import RdmUser from './components/RdmUser'
import RdmCat from './components/RdmCat'
import RdmProducts from './components/RdmProducts'


import React from 'react'

function App() {
  const [active, setActive] = useState('joke')
 
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800'>
      {/* Navigation Bar */}
      <nav className='sticky top-0 z-50 border-b border-white/10 bg-slate-900/95 backdrop-blur-md shadow-lg'>
        <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <h1 className='text-2xl font-bold text-white'>API Explorer</h1>
            </div>
            
            <div className='flex gap-3 flex-wrap justify-center sm:justify-end'>
              <button 
                onClick={() => setActive('joke')} 
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  active === 'joke' 
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10'
                }`}
              >
                Jokes
              </button>
              <button 
                onClick={() => setActive('quote')} 
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  active === 'quote' 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10'
                }`}
              >
                Quotes
              </button>
              <button 
                onClick={() => setActive('user')} 
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  active === 'user' 
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10'
                }`}
              >
                Random User
              </button>
              <button 
                onClick={() => setActive('cat')} 
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  active === 'cat' 
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10'
                }`}
              >
                Cats
              </button>
              <button 
                onClick={() => setActive('products')} 
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  active === 'products' 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/10'
                }`}
              >
                Products
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className='w-full'>
        {active === 'joke' && <RdmJokes />}
        {active === 'quote' && <RdmQuote />}
        {active === 'user' && <RdmUser />}
        {active === 'cat' && <RdmCat />}
        {active === 'products' && <RdmProducts />}
      </main>
    </div>
  )
}

export default App
