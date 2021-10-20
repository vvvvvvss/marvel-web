import {Switch, Redirect, Route} from 'react-router-dom';
import { createTheme, Paper, ThemeProvider } from '@mui/material';
import Home from './pages/Home/Home.js';
import { useState } from 'react';

const App = ()=> {

  const [mode, setMode] = useState('dark');

  const darkTheme = createTheme({
    palette : {
      mode : 'dark'
    },
    typography : {
      fontFamily : 'Montserrat',color:'#ffffff'
    }
});

  const lightMode = createTheme({
    palette : {
      mode : 'light'
    },
    typography : {
      fontFamily : 'Montserrat'
    }
});

  const user = '';

  return (
    <div>
      <ThemeProvider theme={mode==='dark' ? darkTheme : lightMode}>
        <Switch>
            <Route path="/" exact component={Home} /> 
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
