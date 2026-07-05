import UserRoutes from './routes/UserRoutes'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
      <>
        <UserRoutes />
        <Toaster />
      </>
    )
}

export default App