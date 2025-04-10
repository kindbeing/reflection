import { useState } from 'react'
import './App.css'
import RadientSun from './components/RadientSun'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="sun-container">
        <RadientSun size={250} brightness={count} />
      </div>
      <h1>Radient Sun</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Brighten the sun ({count})
        </button>
        <p>
          The sun brightens with each click
        </p>
      </div>
      <p className="read-the-docs">
        A beautiful gradient sun created with SVG and React
      </p>
    </>
  )
}

export default App
