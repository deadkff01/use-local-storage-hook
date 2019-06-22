import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './styles.css'

// App
const App = () => {
  const [name, setName] = useLocalStorage('name', 'deadkff01')
  const onChangeName = e => setName(e.target.value)

  return (
    <>
      <input type="text" placeholder="Enter your name" value={name} onChange={onChangeName} />
      <div>{name}</div>
    </>
  )
}

// Hook
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
