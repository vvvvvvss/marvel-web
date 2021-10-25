import { createTheme } from "@mui/material/styles";

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
          style :{borderRadius:'100px', border:'1.5px solid', color:'#FFD7EA',backgroundColor:'#350006',
                  transition: '200ms',
                  letterSpacing: '0.23em', fontWeight:'600',filter: 'drop-shadow(10px 10px 5px rgba(0, 0, 0, 0.25))',
                '&:hover':{ filter : 'drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.25))',backgroundColor:'#350006' }}},
        ]
      },
      MuiPaper : {
        styleOverrides : {
          root : {backgroundColor : '#031117'}
        },
        variants : [
          { props : { variant : 'widget'},
          style : { borderRadius : '12px', border : '1.5px solid #288C9A', padding :'15px 15px 15px 15px'}}
        ]
      },
      MuiAppBar:{
        styleOverrides:{
          root:{background : 'linear-gradient(90deg, #8B2D44 0%, #C17689 100%)'}
        },
      },
      MuiTypography : {
        variants : [
          { props : {variant : 'widget-heading'},
          style : { fontSize : '12px',letterSpacing : '0.23em', textTransform:'uppercase',
          fontWeight:'600', color:'#D3FFFF', fontFamily : 'Montserrat'}}
        ]
      },
      MuiChip :{
        styleOverrides : { root: { color:'#FFD7EA',border : '1px solid #FFD7EA'}}
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