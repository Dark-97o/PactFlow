import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// test: verify wallet connection error handling [v5.3.59-2026-05-09]

// feat: implement multi-step job posting wizard [v4.5.49-2026-05-17]

// fix: contract address mismatch in production env [v3.4.71-2026-05-19]
