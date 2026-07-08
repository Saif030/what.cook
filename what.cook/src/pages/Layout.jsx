import { Outlet } from "react-router-dom"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import Loader from "../components/Loader"

const Layout = () => {
    const { isLoading , isAuthenticated } = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Nav />
                <main className="flex-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Nav />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;