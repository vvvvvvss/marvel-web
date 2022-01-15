import {Routes, Navigate, Route, useLocation} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home/Home.js';
import { useState, useEffect } from 'react';
import { darkTheme, lightTheme } from './utils/themes.js';
import StuDashboard from './pages/StuDashboard/StuDashboard.js';
import InsDashboard from './pages/InsDashboard/InsDashboard.js';
import NotAccDashboard from './pages/NotAccDashboard/NotAccDashboard.js';
import { useSelector } from 'react-redux';
import CoursePage from './pages/coursePage/coursePage.js';
import ProfilePage from './pages/profilePage/ProfilePage.js';
import Search from './pages/search/Search.js';
import PostPage from './pages/PostPage/PostPage.js';
import Err from './pages/Err.js';

const App = ()=> {
  const location = useLocation();
  const [mode, setMode] = useState('dark');
  const authUser = useSelector((state) => (state.auth.authUser));

  useEffect(() => {
      window.scrollTo(0,0);
  }, [location?.pathname])

  return (
    <>
      <ThemeProvider theme={mode==='dark' ? darkTheme : lightTheme}>
        <Routes>
            <Route path="/" exact element={<Home/>} /> 

            {authUser?.enrollmentStatus==='UNKNOWN' || !authUser?.id ? 
            <Route path="/dashboard" exact element={<Navigate to="/" />} /> : 
            authUser?.currentRole==='STU' ? 
            <Route path="/dashboard" exact element={<StuDashboard/>} /> : 
            authUser?.currentRole==='INS' ? 
            <Route path="/dashboard" exact element={<InsDashboard/>} /> : 
            authUser?.enrollmentStatus==='INACTIVE'&&authUser?.currentRole==='NA' ? 
            <Route path="/dashboard" exact element={<NotAccDashboard/>} /> :
            <Route path="/dashboard" exact element={<Navigate to="/" />} />
            }

            <Route path="/course/:id" exact element={<CoursePage/>} />
            <Route path="/profile/:id" exact element={<ProfilePage/>} />
            <Route path="/search" exact element={<Search/>}/>
            <Route path="/pr/:id" exact element={<PostPage/>}/>
            <Route path="/blog/:id" exact element={<PostPage/>}/>
            <Route path="/rsa/:id" exact element={<PostPage/>}/>
            <Route path="/404" exact element={<Err/>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
