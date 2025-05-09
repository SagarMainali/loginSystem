import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.tsx'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
