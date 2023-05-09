import { Routes, Route, Outlet } from 'react-router-dom';

// Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

// Component
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// App
import MainApp from './pages/app/MainApp';
import Login from './pages/app/Login';

// Page
import Main from './pages/Main';
import About from './pages/About';
import Place from './pages/Place';
import DetailPlace from './pages/DetailPlace';
import City from './pages/City';
import DetailCity from './pages/DetailCity';

const AppLayout = () => (
  <>
    <div className="container mt-5">
      <Outlet />
    </div>
  </>
)

function App() {
  return (
    <>
      <header>
        <Navigation />
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
            <Route path='city'>
              <Route index element={<City />} />
              <Route path=':city' element={<DetailCity />} />
            </Route>
          </Route>

          <Route path='/app'>
            <Route index element={<MainApp />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
