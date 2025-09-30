import { useEffect, useRef, useState } from 'react'

const CELL = 25
const GRID = 25 // 20x20 -> 400x400
const SPEED_MS = 120

function randFood(exclude) {
  while (true) {
    const x = Math.floor(Math.random() * GRID)
    const y = Math.floor(Math.random() * GRID)
    if (!exclude.some(p => p.x === x && p.y === y)) return { x, y }
  }
}

export default function SnakeGame({ onExit }) {
  const canvasRef = useRef(null)
  const dirRef = useRef({ x: 1, y: 0 })
  const nextDirRef = useRef({ x: 1, y: 0 })
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(true)
  const runningRef = useRef(true)
  const [soundOn, setSoundOn] = useState(true)
  const soundOnRef = useRef(true)
  const snakeRef = useRef([
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 }
  ])
  const foodRef = useRef(randFood(snakeRef.current))
  const timerRef = useRef(null)
  const audioRef = useRef(null)

  function ensureAudio() {
    if (!audioRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (Ctx) audioRef.current = new Ctx()
    }
    // attempt resume if user has interacted
    if (audioRef.current && audioRef.current.state === 'suspended') {
      try { audioRef.current.resume() } catch {}
    }
    return audioRef.current
  }

  function playTone(freq = 440, durationMs = 120, type = 'square', volume = 0.06) {
    if (!soundOnRef.current) return
    const ctx = ensureAudio()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.value = 0.0001
    osc.connect(gain)
    gain.connect(ctx.destination)
    const now = ctx.currentTime
    osc.start(now)
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000)
    osc.stop(now + durationMs / 1000 + 0.02)
  }

  function sfxEat() {
    playTone(900, 90)
  }
  function sfxGameOver() {
    playTone(220, 180, 'sawtooth', 0.05)
    setTimeout(() => playTone(160, 220, 'sawtooth', 0.05), 120)
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onExit?.()
        return
      }
      if (!running) {
        if (e.key.toLowerCase() === 'r') {
          restart()
        }
        return
      }
      const k = e.key
      let nd = null
      if (k === 'ArrowUp' || k.toLowerCase() === 'w') nd = { x: 0, y: -1 }
      else if (k === 'ArrowDown' || k.toLowerCase() === 's') nd = { x: 0, y: 1 }
      else if (k === 'ArrowLeft' || k.toLowerCase() === 'a') nd = { x: -1, y: 0 }
      else if (k === 'ArrowRight' || k.toLowerCase() === 'd') nd = { x: 1, y: 0 }
      if (nd) {
        // prevent 180 turns
        const cur = dirRef.current
        if (cur.x + nd.x !== 0 || cur.y + nd.y !== 0) {
          nextDirRef.current = nd
        }
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [running, onExit])

  useEffect(() => {
    timerRef.current = setInterval(tick, SPEED_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  function restart() {
    snakeRef.current = [
      { x: 8, y: 10 },
      { x: 7, y: 10 },
      { x: 6, y: 10 }
    ]
    dirRef.current = { x: 1, y: 0 }
    nextDirRef.current = { x: 1, y: 0 }
    foodRef.current = randFood(snakeRef.current)
    setScore(0)
    setRunning(true)
    runningRef.current = true
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(tick, SPEED_MS)
  }

  function tick() {
  if (!runningRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    dirRef.current = nextDirRef.current
    const snake = snakeRef.current.slice()
    const head = { x: snake[0].x + dirRef.current.x, y: snake[0].y + dirRef.current.y }

    // walls
    if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID) {
      setRunning(false)
      runningRef.current = false
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
      sfxGameOver()
      draw(ctx, snake, foodRef.current, true)
      return
    }
    // self collision
    if (snake.some(p => p.x === head.x && p.y === head.y)) {
      setRunning(false)
      runningRef.current = false
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
      sfxGameOver()
      draw(ctx, snake, foodRef.current, true)
      return
    }

    snake.unshift(head)
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setScore(s => s + 1)
      foodRef.current = randFood(snake)
      sfxEat()
    } else {
      snake.pop()
    }
    snakeRef.current = snake
    draw(ctx, snake, foodRef.current, false)
  }

  function draw(ctx, snake, food, gameOver) {
    ctx.fillStyle = getComputedStyle(document.body).backgroundColor
    ctx.fillRect(0, 0, CELL * GRID, CELL * GRID)

    // grid faint (optional)
    // ctx.strokeStyle = 'rgba(255,255,255,0.06)'
    // for (let i = 0; i <= GRID; i++) {
    //   ctx.beginPath(); ctx.moveTo(i*CELL,0); ctx.lineTo(i*CELL,GRID*CELL); ctx.stroke()
    //   ctx.beginPath(); ctx.moveTo(0,i*CELL); ctx.lineTo(GRID*CELL,i*CELL); ctx.stroke()
    // }

    // food
    ctx.fillStyle = '#ff6b6b'
    ctx.fillRect(food.x * CELL, food.y * CELL, CELL, CELL)

    // snake
    ctx.fillStyle = getComputedStyle(document.body).color || '#39ff14'
    snake.forEach((p, i) => {
      ctx.fillRect(p.x * CELL, p.y * CELL, CELL, CELL)
    })

    if (gameOver) {
      const W = CELL * GRID, H = CELL * GRID
      ctx.fillStyle = 'rgba(0,0,0,0.6)'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = 'bold 20px ui-monospace, Menlo, monospace'
      ctx.fillText('Game Over', W / 2, H / 2 - 16)
      ctx.font = '14px ui-monospace, Menlo, monospace'
      ctx.fillText('Press R to restart', W / 2, H / 2 + 4)
      ctx.fillText('Esc to exit', W / 2, H / 2 + 24)
    }
  }

  return (
    <div className="snakeOverlay" role="dialog" aria-modal="true">
      <div className="snakeContainer">
        <div className="snakeHeader">
          <span>Snake — Score: {score}</span>
          <div className="snakeActions">
            <button
              className="snakeClose"
              onClick={() => {
                setSoundOn(s => {
                  const ns = !s
                  soundOnRef.current = ns
                  return ns
                })
              }}
              aria-label={soundOn ? 'Mute' : 'Unmute'}
              title={soundOn ? 'Mute' : 'Unmute'}
            >
              {soundOn ? '🔊' : '🔇'}
            </button>
            <button className="snakeClose" onClick={() => onExit?.()}>×</button>
          </div>
        </div>
        <canvas ref={canvasRef} width={CELL * GRID} height={CELL * GRID} />
        <div className="snakeHelp">Use Arrow Keys / WASD. Esc to exit. R to restart.</div>
      </div>
    </div>
  )
}
