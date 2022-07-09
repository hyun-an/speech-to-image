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
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ queryText: query })
    })
      .then(res => res.json())
      .then(data => setResult(data.output))
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
