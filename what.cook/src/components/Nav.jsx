import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState , useContext } from 'react'
import { mainlogo } from '../assets/assets.js'
import { AuthContext } from '../context/AuthContext'
import UserDropdown from './UserDropdown.jsx'

const Nav = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user , handleLogout } = useContext(AuthContext)
    const [ boxOpen, setBoxOpen ] = useState(false)

    return (
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex cursor-pointer items-center gap-2.5">
            <img src={mainlogo} alt="Main Logo" className="h-11" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            { user && (
              <>
                <Link to="/public-recipes" className="hover:text-orange-500 transition-colors cursor-pointer">Recipes</Link>
                <Link to="/about" className="hover:text-orange-500 transition-colors cursor-pointer">About</Link>
                <Link to="/contact" className="hover:text-orange-500 transition-colors cursor-pointer">Contact us</Link>
              </>
            ) }
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div onClick={() => setBoxOpen(!boxOpen)} className="px-5 py-2 text-sm flex items-center gap-3 rounded-full border-1 border-gray-200 cursor-pointer">
                <div className='w-9 h-9 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center'>
                  <span className='text-orange-500 text-sm font-bold'>{user?.username?.[0]?.toUpperCase()}</span>
                </div>
                <div className='flex flex-col'>
                  <p className='text-sm'>{user?.username}</p>
                  <p className='text-xs text-gray-500'>{user?.email}</p>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                  Log in
                </Link>
                <Link to="/register" className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-105 transition-all cursor-pointer">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : (<Menu className="w-6 h-6" />)}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
            {user ? (
              <>
              <Link to="/dashboard" className="block text-gray-600 font-medium cursor-pointer">Dashboard</Link>
              <Link to="/public-recipes" className="block text-gray-600 font-medium cursor-pointer">Recipes</Link>
              <Link to="/about" className="block text-gray-600 font-medium cursor-pointer">About</Link>
              <Link to="/contact" className="block text-gray-600 font-medium cursor-pointer">Contact us</Link>
              <button onClick={() => {handleLogout(); window.location.reload();}} className="block text-gray-600 font-medium cursor-pointer">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-600 font-medium cursor-pointer">Log in</Link>
                <Link to="/register" className="block text-gray-600 font-medium cursor-pointer">Get Started</Link>
              </>
            )}

          </div>
        )}
        {boxOpen && (
          <UserDropdown user={user} handleLogout={handleLogout} />
        )}
      </nav>
    )
}

export default Nav