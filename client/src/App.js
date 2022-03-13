import {Routes, Route, useLocation} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Home from './pages/Home/Home.js';
import { useState, useEffect } from 'react';
import { darkTheme, lightTheme } from './utils/themes.js';
import CoursePage from './pages/coursePage/coursePage.js';
import ProfilePage from './pages/profilePage/ProfilePage.js';
import Search from './pages/search/Search.js';
import PostPage from './pages/PostPage/PostPage.js';
import Err from './pages/Err.js';
import DbStage from './pages/DbStage.js';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime:1000*60*60*48,
      refetchOnMount:false,
      refetchOnReconnect:false,
      refetchInterval:1000*60*60*48,
      cacheTime:1000*60*60*48,
      retry:false
    },
  },
});


const App=()=> {
  const location = useLocation();
  const mode = 'dark';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location?.pathname]);

  return (
    <>
      <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/dashboard" exact element={<DbStage />} />
            <Route path="/course/:id" exact element={<CoursePage />} />
            <Route path="/profile/:id" exact element={<ProfilePage />} />
            <Route path="/search" exact element={<Search />} />
            <Route path="/pr/:id" exact element={<PostPage viewPostType="pr" />} />
            <Route path="/blog/:id" exact element={<PostPage viewPostType="blog" />} />
            <Route path="/rsa/:id" exact element={<PostPage viewPostType="rsa" />} />
            <Route path="/404" exact element={<Err />} />
          </Routes>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
