import React, { useState } from 'react';
import { auth } from '../firebaseconfig';
import { useHistory } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [msgError, setMsgError] = useState(null);
  const history = useHistory();

  const registerUser = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, pass)
      .then(res => {
        console.log('Usuario registrado', res);
        history.push('/');
        setMsgError(null);
      })
      .catch(e => {
        getError(e);
      });
  };

  const loginUser = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, pass)
      .then(res => {
        console.log('Inicio de sesión', res);
        history.push('/');
        setMsgError(null);
      })
      .catch(e => {
        console.log(e)
        getError(e);
      });
  };

  const getError = (e) => {
    if (e.code == 'auth/invalid-email') {
      setMsgError('Fomato de Email incorrecto')
    }
    if (e.code == 'auth/weak-password') {
      setMsgError('El Password debe tener mínimo 6 caracteres')
    }
    if (e.code == 'auth/wrong-password' || e.code == 'auth/user-not-found') {
      setMsgError('El Email o Password no coinciden')
    }
  };

  return (
    <div className='row mt-5'>
      <div className='col'></div>
      <div className='col'>
        <form className='form-group' onSubmit={registerUser}>
          <input className='form-control'
            onChange={(e) => { setEmail(e.target.value) }}
            type='email'
            placeholder='Introduce el Email'
            required />
          <input className='form-control mt-4'
            onChange={(e) => { setPass(e.target.value) }}
            type='password'
            placeholder='Introduce el password'
            minLength='6'
            required />
          <input className='btn btn-dark btn-block mt-4'
            value='Registrar'
            type='submit' />
        </form>
        <button className='btn btn-success btn-block'
          onClick={loginUser}>
          Iniciar sesión
        </button>
        {
          msgError != null ?
            (
              <div className='alert alert-danger mt-4'>
                {msgError}
              </div>
            )
            :
            (<span></span>)
        }
      </div>
      <div className='col'></div>
    </div>
  );
}

export default Login;
