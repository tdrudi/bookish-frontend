import React, { useContext } from 'react';
import UserContext from './auth/UserContext';
import { Link } from 'react-router-dom';
import '../css/nav.css';

//Only allow users to see profile if logged in, 

function Navbar({ logout, isLoggedIn }) {
    const { currUser } = useContext(UserContext);
    return (
        <div id='navbar'>
            <h1><Link to="/">Bookish</Link></h1>
            <ul>

                {isLoggedIn
                    ? <>
                        <li><Link to="/books">Books</Link></li>
                        <li><Link to="/lists">Lists</Link></li>
                        <li><Link to={`/profile/${currUser.username}`}>Profile</Link></li>
                        <li><Link to="/search">Search Books</Link></li>
                        <li><Link to="/" onClick={logout}>Log Out</Link></li>
                    </>
                    : <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                }
            </ul>
        </div>
    );
}

export default Navbar;