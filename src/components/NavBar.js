import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

import logo from '../assets/img/logo-white.png';
// need to pass in props for user.
import axios from 'axios';

function NavBar() {
  const [currentUser, setCurrentUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let processing = true;
    const token = cookies.get('jwt');
    if (token) {
      const decodedToken = jwt_decode(token);

      getUser(processing, decodedToken).then((user) => {
        if (processing) {
          setCurrentUser(user);
          setLoading(false);
          setIsAuthenticated(true);
        }
      });
      return () => {
        processing = false;
        setIsAuthenticated(true);
      };
    } else {
      setLoading(false)
    }
  }, []);

  const getUser = async (processing, decoded) => {
    try {
      const res = await axios
      .get(`http://localhost:3000/api/v1/users/${decoded.id}`, {
        withCredentials: true,
      })

      if (processing) {
        console.log(decoded);
        const curUser = res.data.data.data;
        console.log(curUser);
        return curUser;
      }

    } catch (err) {
      console.log(err)
    }
  };

  const handleLogout = () => {
    // Remove the token from the cookie
    cookies.remove('jwt');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className='header'>
      <nav className='nav nav--tours'>
        <a href='/' className='nav__el'>
          All tours
        </a>
      </nav>

      <div className='header__logo'>
        <img src={logo} alt='Natours logo' />
      </div>

      {isAuthenticated ? (
        <nav className='nav nav--user'>
          <button className='nav__el' onClick={handleLogout}>
            Log out
          </button>
          <a href='/' className='nav__el'>
            <img
              src={require(`../assets/img/users/${currentUser.photo}`)}
              alt='User avi'
              className='nav__user-img'
            />
            <span>{currentUser.name.split(' ')[0]}</span>
          </a>
        </nav>
      ) : (
        <nav className='nav nav--user'>
          <a href='/login' className='nav__el'>
            Log in
          </a>
          <a href='/signup' className='nav__el nav__el--cta'>
            Sign up
          </a>
        </nav>
      )}
      {/* {isAuthenticated ? (
        <nav className='nav nav--user'>
          <button className='nav__el' onClick={handleLogout}>
            Log out
          </button>
          <a href='/' className='nav__el'>
            <img src='img/user.jpg' alt='User photo' className='nav__user-img' />
            <span>Name</span>
          </a>
        </nav>
      ) : (
        <nav className='nav nav--user'>
          <a href='/login' className='nav__el'>
            Log in
          </a>
          <a href='/signup' className='nav__el nav__el--cta'>
            Sign up
          </a>
        </nav>
      )} */}
    </header>
  );
}

export default NavBar;
