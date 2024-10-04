import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import DogGallery from './components/dogs.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DogGallery />
  </StrictMode>,
)
