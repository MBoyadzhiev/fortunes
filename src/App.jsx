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

  const handleNewFortune = () => {
    const randomFortune = getRandomFortune()
    setFortune(randomFortune)
  }

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>☕ Твоята Съдба</h1>
          <p>Добре дошли!</p>
        </header>

        {fortune && (
          <div className="fortune-section">
            <div className="fortune-card">
              <div className="fortune-icon">🍀</div>
              <p className="fortune-text">{fortune}</p>
              <button className="new-scan-button" onClick={handleNewFortune}>
                Нова Съдба
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
