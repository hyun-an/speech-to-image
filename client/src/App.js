import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)
  const [result, setResult] = useState('Hello ')

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setData(data.message))
  }, [])

  const getImage = () => {
    let query = document.getElementById('input')?.value
    console.log('from client: ' + query)
    fetch('/getimg', {
      method: 'POST',
      body: JSON.stringify({ queryText: query })
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <p>{!data ? 'Loading...' : data}</p>
        <input className='text-black' placeholder='do something' id='input' />
        <button onClick={getImage}>Submit</button>
        <p>{result}</p>
      </header>
    </div>
  )
}

export default App
