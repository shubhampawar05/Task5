import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Task5 from './components/Task5'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <Task5/>
   </>
  )
}

export default App
