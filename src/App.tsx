import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router';
import { Home } from '@/pages/Home';
import { NavContainer } from './components/NavContainer';
import { Footer } from './components/Footer';
import { isDev } from './tumblers';
import { Media } from './pages/Media/Media';
import styles from './App.module.scss';

const Layout = () => {
  return (
    <>
      <NavContainer />

      <Outlet />

      <Footer />
    </>
  );
};

function App() {
  return (
    <div className={styles.appWrapper}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={
              <Home isDev={isDev} />
            }/>

            <Route path='/media' element={
              <Media />
            }/>
          </Route>

          <Route path='*' element={ <Navigate to='/' /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;