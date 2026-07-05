import { Routes, Route } from 'react-router-dom'
import Login from '../pages/AuthPages/Login'
import Home from '../pages/Home'
import Register from '../pages/AuthPages/Register'
import DashboardPage from '../pages/DashboardPage'
import RecipeGeneratorPage from '../pages/RecipeGeneratorPage'
import PublicRecipesPage from '../pages/PublicRecipesPage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import Layout from '../pages/Layout.jsx'
import ProtectedLayout from '../pages/ProtectedLayout.jsx'
import RecipesShow from '../pages/RecipesShow.jsx'

const UserRoutes = () => {
    return (
        <Routes>
            {/* Auth pages — NO Nav/Footer */}
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} /> 
            
            {/* Public routes — WITH Nav/Footer */}
            <Route element={<Layout />}>
                <Route index element={<Home />} /> 
                <Route path="/home" element={<Home />} />
            </Route>
            
            {/* Protected routes — WITH Nav/Footer + auth check */}
            <Route element={<ProtectedLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/about" element={<AboutPage />} /> 
                <Route path="/recipe-generator" element={<RecipeGeneratorPage />} />
                <Route path="/public-recipes" element={<PublicRecipesPage />} /> 
                <Route path="/contact" element={<ContactPage />} /> 
                <Route path="/recipe/:id" element={<RecipesShow />} /> 
            </Route>
        </Routes>
    )
}

export default UserRoutes