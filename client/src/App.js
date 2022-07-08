import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setData(data.message))
  }, [])

  const getImage = () => {
    let query = document.getElementById('input')?.value
    console.log('from client: ' + query)
    fetch('/getimg')
      .then(res => res.json())
      .then(data => console.log(data.message))
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <p>{!data ? 'Loading...' : data}</p>
        <input className='text-black' placeholder='do something' id='input' />
        <button onClick={getImage}>Submit</button>
      </header>
    </div>
  )
}

export default App
