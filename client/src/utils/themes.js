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
      MuiChip : {
        variants :[{
          props : { variant : 'navbar'},
          style : {
            border: '1.5px solid #696969', height: '40px', borderRadius: '100px', fontWeight:'500',
            padding: '0px 0px 0px 0px', backgroundColor : 'rgba(0,0,0,0)',"&:hover":{backgroundColor : '#404040'}
          }
        }],
      },
      MuiButton : {
        variants : [
          {props :{variant : 'rounded-outlined'}, 
          style :{borderRadius:'100px', border:'1px solid', color:'#FFD7EA'}}
        ]
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