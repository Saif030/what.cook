import { Navigate } from 'react-router-dom'
import Layout from './Layout'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/Loader.jsx'

const ProtectedLayout = () => {
    const { isAuthenticated, isLoading } = useContext(AuthContext)
    
    if (isLoading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // Auth passed — render the normal layout (Nav + Outlet + Footer)
    return <Layout />
}

export default ProtectedLayout