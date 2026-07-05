import { Outlet } from "react-router-dom"
import Nav from "../components/Nav"
import Footer from "../components/Footer"

const Layout = ({ user }) => {
    return (
        <>
            <Nav user={user} />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout