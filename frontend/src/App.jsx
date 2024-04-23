import './App.scss'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import UsersView from './endpoints/users'
import SignupForm from './endpoints/signup'
import HomeView from './endpoints/home'
import LoginForm from './endpoints/login'
import ProfileView from './endpoints/profile'
import LogoutView from './endpoints/logout'
import SelfProfileView from './endpoints/self_profile'
import VideoView from './endpoints/video/'

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul className='nav-links'>
            <li className='nav-links__item'>
              <Link to='/'>Главная</Link>
            </li>
            {!isAuthenticated && (
              <li className='nav-links__item'>
                <Link to='/signup'>Регистрация</Link>
              </li>
            )}
            {!isAuthenticated && (
              <li className='nav-links__item'>
                <Link to='/login'>Войти</Link>
              </li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<HomeView />} />
          <Route path='/users' element={<UsersView />} />
          <Route path='/users/:pk' element={<ProfileView />} />
          <Route path='/videos/:pk' element={<VideoView />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/logout' element={<LogoutView />} />
          <Route path='/profile' element={<SelfProfileView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
