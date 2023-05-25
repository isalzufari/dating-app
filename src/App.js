import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { logoutAction } from './utils/action';

// Component
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Page
import Main from './pages/Main';
import About from './pages/About';
import Place from './pages/Place';
import DetailPlace from './pages/DetailPlace';
import Location from './pages/Location';
import DetailLocation from './pages/DetailLocation';

// App
import MainApp from './pages/app/MainApp';
import Login from './pages/app/Login';
import Register from './pages/app/Register';
import Reviews from './pages/app/review/Reviews';
import Places from './pages/app/place/Places';
import api from './utils/api';

const AppLayout = () => (
  <>
    <div className="container mt-5">
      <Outlet />
    </div>
  </>
)

const ProtectedRoute = ({ authUser, children }) => {
  if (!authUser) {
    return <Navigate to="/" replace />
  }
  console.log(authUser)
  return children ? children : <Outlet />;
}

function App() {
  const [authUser, setauthUser] = useState(null);

  useEffect(() => {
    const asyncPreloadProcess = async () => {
      const authUser = await api.getOwnProfile();
      setauthUser(authUser);
    }
    asyncPreloadProcess();
  }, []);

  const onSignOut = () => {
    setauthUser(null);
    logoutAction();
  }

  return (
    <>
      <header>
        <Navigation authUser={authUser} signOut={onSignOut} />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Main />} />

          <Route path='/' element={<AppLayout />}>
            <Route path='about' element={<About />} />
            <Route path='place'>
              <Route index element={<Place />} />
              <Route path=':place' element={<DetailPlace />} />
            </Route>
            <Route path='locations'>
              <Route index element={<Location />} />
              <Route path=':location' element={<DetailLocation />} />
            </Route>
          </Route>

          <Route path='/app' element={<AppLayout />}>
            <Route path='login' element={<Login setauthUser={setauthUser} />} />
            <Route path='register' element={<Register />} />

            <Route element={<ProtectedRoute authUser={authUser} />}>
              <Route index element={<MainApp />} />
              <Route path='reviews' element={<Reviews />} />
              <Route path='places'>
                <Route index element={<Places />} />
              </Route>
            </Route>

          </Route>

          <Route path='*' element={
            <h1 className='h5 text-center m-5'>Halaman tidak ditemukan</h1>
          } />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
