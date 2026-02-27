import { useState, useEffect } from 'react'
import fortunes from './fortunes.json'
import './App.css'

function App() {
  const [fortune, setFortune] = useState(null)

  const getRandomFortune = () => {
    const randomIndex = Math.floor(Math.random() * fortunes.length)
    return fortunes[randomIndex]
  }

  useEffect(() => {
    // Автоматично показвай съдба при зареждане на приложението
    const randomFortune = getRandomFortune()
    setFortune(randomFortune)
  }, [])

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="shop-title">
          Късмет от Pa<span className="red-u">u</span>se Shop
        </h1>
      </div>
      {fortune && (
        <div className="fortune-section">
          <div className="fortune-card">
            <p className="fortune-text">{fortune}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
