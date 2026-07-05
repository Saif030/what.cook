import { Outlet } from "react-router-dom"
import Nav from "../components/Nav"
import Footer from "../components/Footer"

const Layout = ({ user }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Nav user={user} />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;