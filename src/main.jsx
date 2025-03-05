import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from "@heroui/react"
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </BrowserRouter>,
)