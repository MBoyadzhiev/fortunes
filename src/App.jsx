import { useState, useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import fortunes from './fortunes.json'
import './App.css'

function App() {
  const [isScanning, setIsScanning] = useState(false)
  const [fortune, setFortune] = useState(null)
  const [error, setError] = useState(null)
  const scannerRef = useRef(null)
  const html5QrCodeRef = useRef(null)

  const getRandomFortune = () => {
    const randomIndex = Math.floor(Math.random() * fortunes.length)
    return fortunes[randomIndex]
  }

  const startScanning = async () => {
    try {
      setError(null)
      setIsScanning(true)
      setFortune(null)

      const html5QrCode = new Html5Qrcode("reader")
      html5QrCodeRef.current = html5QrCode

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          // Баркодът е сканиран успешно
          html5QrCode.stop().then(() => {
            setIsScanning(false)
            const randomFortune = getRandomFortune()
            setFortune(randomFortune)
          }).catch((err) => {
            console.error("Грешка при спиране на сканера:", err)
            setIsScanning(false)
          })
        },
        (errorMessage) => {
          // Игнорирай грешките при сканиране (те са чести по време на сканиране)
        }
      )
    } catch (err) {
      console.error("Грешка при стартиране на сканера:", err)
      setError("Неуспешно стартиране на камерата. Моля, провери разрешенията и опитай отново.")
      setIsScanning(false)
    }
  }

  const stopScanning = async () => {
    try {
      if (html5QrCodeRef.current) {
        await html5QrCodeRef.current.stop()
        html5QrCodeRef.current.clear()
        html5QrCodeRef.current = null
      }
      setIsScanning(false)
    } catch (err) {
      console.error("Грешка при спиране на сканера:", err)
      setIsScanning(false)
    }
  }

  const handleNewScan = () => {
    setFortune(null)
    setError(null)
    startScanning()
  }

  useEffect(() => {
    return () => {
      // Почистване при размонтиране
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(() => {})
      }
    }
  }, [])

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>☕ Сканирай Своята Съдба</h1>
          <p>Сканирай баркода, за да получиш своето специално послание</p>
        </header>

        {!fortune && !isScanning && (
          <div className="start-section">
            <button className="scan-button" onClick={startScanning}>
              Започни Сканиране
            </button>
          </div>
        )}

        {isScanning && (
          <div className="scanner-section">
            <div id="reader" className="scanner"></div>
            <button className="stop-button" onClick={stopScanning}>
              Спри Сканирането
            </button>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button className="retry-button" onClick={handleNewScan}>
              Опитай Отново
            </button>
          </div>
        )}

        {fortune && (
          <div className="fortune-section">
            <div className="fortune-card">
              <div className="fortune-icon">🍀</div>
              <p className="fortune-text">{fortune}</p>
              <button className="new-scan-button" onClick={handleNewScan}>
                Сканирай Отново
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
