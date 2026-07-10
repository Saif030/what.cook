import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx'
import DataContextProvider from './context/DataContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <DataContextProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </DataContextProvider>
    </BrowserRouter>
)
