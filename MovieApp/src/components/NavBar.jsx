import {Link} from 'react-router-dom'
import "../css/Navbar.css"


function NavBar(){
    return <nav className='navbar'>
        <div className="navbar-brand">
           <Link to="/">movie Apps</Link>
        </div>
        <div className='navbar-links'>
            <Link to="/" className='nav-link'>home</Link>
            <br />
            <Link to="/favorites" className='nav-link'>Favorites</Link>
        </div>
    </nav>
}

export default NavBar