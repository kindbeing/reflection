import { useState, useEffect } from 'react'
import './App.css'
import RadientSun from './components/RadientSun'

function App() {
  const [count, setCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Set mounted after component mounts to prevent SSR hydration issues with random ray positions
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div className="sun-container">
        {mounted && <RadientSun size={320} brightness={count} />}
      </div>
      <h1>Career Reflection</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Brighten the sun ({count})
        </button>
        <p>
          The sun brightens with each click
        </p>
      </div>
      <div className="instructions">
        <p>
          Each colored ray represents a client engagement in my career journey.
          <br />
          Click on any ray to view details about that project.
        </p>
      </div>
      <p className="read-the-docs">
        An interactive visualization of professional engagements
      </p>
    </>
  )
}

export default App
