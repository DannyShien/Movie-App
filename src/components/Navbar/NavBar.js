import React from './node_modules/react';
import { Link } from './node_modules/react-router-dom'
import './NavBar.css'
 
const NavBar = () => {
    return (
        <div className='navbar'>
            <div className='navTitle navAlign'>
                <Link to = '/' className='links'>PhonyMovies</Link>
            </div>
            <div className='navOptions navAlign'>
                <Link to = '/movies' className='links'>Movies</Link>
                <Link to = '/tv' className='links'>TV Shows</Link>
                <Link to = '/recent' className='links'>Recently Added</Link>
                <Link to = '/mylist' className='links'>My List</Link>
            </div>
            <div className='navProfile navAlign'>
                <Link to = '/search'>Search</Link>
                <Link to = '/setting' className='links'>Profile</Link>
            </div>
        </div>
    )
}

export default NavBar; 