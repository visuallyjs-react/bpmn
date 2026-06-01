import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {registerBPMNIconTag} from "@visuallyjs/bpmn"

registerBPMNIconTag()

createRoot(document.body).render(
  <StrictMode>
    <App url="/dataset.json"/>
  </StrictMode>,
)
