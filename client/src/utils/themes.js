import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
    palette : {
      mode : 'dark',
      primary :{
        main : '#CC4E6C', light : '#FFD7EA', dark : '#350006'
      },
      secondary : {
        main : '#35B0C0', light : '#D3FFFF', dark : '#001C28'
      }, warning : {main :'#7C742D'} , success:{main:'#257E16'}, error :{main:'#EA0101'}
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
          {props :{color : 'secondary', variant:'contained'}, 
          style :{ backgroundColor:'#09606C',border:'1px solid #09606C',color: '#D3FFFF','&:hover':{border:'1px solid #D3FFFF', backgroundColor:'#0E373D'}}},
              ]
      },
      MuiPaper : {
        styleOverrides : {
          root : {backgroundColor : '#031117'}
        },
        variants : [
          { props : { variant : 'widget'},
          style : { borderRadius : '12px', border : '1.5px solid #288C9A', padding :'15px 15px 15px 15px',}},
          { props : { variant : 'window'},
          style : {backgroundColor : '#000000'}}
        ]
      },
      MuiAppBar:{
        styleOverrides:{
          root:{background : 'linear-gradient(90deg, #8B2D44 0%, #C17689 100%)',}
        },
      },
      MuiTypography : {
        variants : [
          { props : {variant : 'widget-heading'},
          style : { fontSize : '12px',letterSpacing : '0.23em', textTransform:'uppercase',
          fontWeight:'600', color:'#D3FFFF', fontFamily : 'Montserrat'}},
          { props : { variant : 'heading'},
          style : { fontFamily : 'Montserrat', fontWeight : '600', fontSize:'14px',letterSpacing:'0.23em',
          color:'#D3FFFF',backgroundColor:'#1E2629' ,lineHeight : '40px', textTransform:'uppercase'}},
          { props : { variant : 'code-small'},
          style : { fontFamily : 'Source Code Pro',fontSize:'13px', color:'#c4c4c4'}}
        ]
      },
      MuiChip :{
        styleOverrides : { root: { }},
        variants : [
          { props : {variant:'outlined'},
            style : {color:'#FFD7EA',border : '1.5px solid #FFD7EA',fontWeight:'500'}}
        ]
      },
      MuiCard : {
        styleOverrides : { root : { padding : '10px', backgroundColor : '#112020',borderRadius:'8px',border :'1px solid #5B7B80' }}
      },
      MuiLink:{
        styleOverrides:{root : { color : '#CC4E6C'}}
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