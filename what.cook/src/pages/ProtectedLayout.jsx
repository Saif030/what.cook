import { Navigate } from 'react-router-dom'
import Layout from './Layout'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/Loader.jsx'

const ProtectedLayout = () => {
    const { isAuthenticated, isLoading } = useContext(AuthContext)

    // Always check loading first, or logged-in users will flash the login page on refresh
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