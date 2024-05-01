import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';

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
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/" className='text-warning'>Breathless vids</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isAuthenticated ? (
              <Nav className="me-auto">
                <Nav.Link href="/profile">Профиль</Nav.Link>
                <Nav.Link href="/logout">Выйти</Nav.Link>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <Nav.Link href="/login">Войти</Nav.Link>
                <Nav.Link href="/signup">Зарегистрироватся</Nav.Link>
              </Nav>
            )
          }
      </Navbar.Collapse>
      </Container>
    </Navbar>
        <Routes>
          <Route path='/' element={<HomeView />} />
          <Route path='/users' element={<UsersView />} />
          <Route path='/users/:pk' element={<ProfileView />} />
          <Route path='/videos/:id' element={<VideoView />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/logout' element={<LogoutView />} />
          <Route path='/profile' element={<SelfProfileView />} />
        </Routes>
    </Router>
  );
}

import 'bootstrap/dist/css/bootstrap.min.css';
export default App
