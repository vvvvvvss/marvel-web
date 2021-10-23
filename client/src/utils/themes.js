import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette : {
      mode : 'dark',
      primary :{
        main : '#9B2D48', light : '#FFD7EA', dark : '#350006'
      },
      secondary : {
        main : '#288C9A', light : '#D3FFFF', dark : '#001C28'
      }
    },
    typography : {
      fontFamily : 'Montserrat',color:'#ffffff'
    },
    components : {
      MuiButton : {
        variants : [
          {props :{variant : 'rounded-outlined'}, 
          style :{borderRadius:'100px', border:'1px solid', color:'#FFD7EA'}},
          {props :{variant : 'rounded-avatar'}, 
          style :{borderRadius:'100px', border: '1px solid #FFD7EA',color:'#FFD7EA',
          padding:'5px 12px 5px 10px', }},
        ]
      },
      MuiPaper : {
        styleOverrides : {
          root : {backgroundColor : '#031117'}
        }
      },
      MuiAppBar:{
        styleOverrides:{
          root:{backgroundColor : '#6A353B'}
        }
      }
    }
});

export const lightTheme = createTheme({
    palette : {
      mode : 'light'
    },
    typography : {
      fontFamily : 'Montserrat'
    }
});