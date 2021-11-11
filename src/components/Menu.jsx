import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebaseconfig';

const Menu = () => {

  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
        console.log(user.email);
      }
    });
  }, []);

  const signOut = () => {
    auth.signOut()
      .then(res => {
        console.log('Sesión cerrada', res);
        history.push('/login');
      })
      .catch(e => {
        console.log(e);
      });
    setUser(null);
  };

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <ul className='navbar-nav mr-auto flex-row'>
          <li className='nav-item mr-3'>
            <Link className='nav-link' to='/'>Inicio</Link>
          </li>
          {
            user == null ?
              (
                <li className='nav-item mr-3'>
                  <Link className='nav-link' to='/login'>Login</Link>
                </li>
              )
              :
              (<span></span>)
          }
          {
            user != null ?
              (
                <li className='nav-item mr-3'>
                  <Link className='nav-link' to='/login'>Admin</Link>
                </li>
              )
              :
              (<span></span>)
          }
        </ul>
        {
          user != null ?
          (
            <button className='btn btn-danger'
              onClick={signOut}>Cerrar sesión</button>
          )
          :
          (<span></span>)
        }
      </nav>
    </div>
  );
}

export default Menu;
