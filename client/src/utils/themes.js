import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1100,
      xl: 1580,
    },
  },
    palette : {
      mode : 'dark',
      primary :{
        main : '#CC4E6C', light : '#FFD7EA', dark : '#350006'
      },
      secondary : {
        main : '#35B0C0', light : '#D3FFFF', dark : '#001C28'
      }, warning : {main :'#7C742D'} , success:{main:'#257E16'}, error :{main:'#B50000'}
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
          root : {backgroundColor : '#031117',borderRadius:'0px',boxShadow:'none'}
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
        variants : [
          { props: {variant:"transparent"},
          style : { background : 'rgba(0,0,0,0)',backdropFilter: 'blur(10px)', padding:'25px' }}
        ]
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
          style : { fontFamily : 'Source Code Pro', color:'#eeeeee',fontSize:'15px',}}
        ]
      },
      MuiChip :{
        variants : [
          { props : {variant:'outlined', color:'primary'},
            style : {color:'#FFD7EA',border : '1px solid #FFD7EA',fontWeight:'500'}},
          { props : {variant:'outlined', color:'secondary'},
            style : {color:'#D3FFFF',border : '1px solid #D3FFFF',fontWeight:'500'}},
        ]
      },
      MuiCard : {
        styleOverrides : { root : { padding : '10px', backgroundColor : '#112020',borderRadius:'8px',border :'1px solid #5B7B80' }}
      },
      MuiLink:{
        styleOverrides:{root : { color : '#FF7596',  
        overflowWrap:'break-word',
        wordBreak:"break-word", 
        wordWrap: 'break-word',
        msWordBreak:"break-all"  
      }}
      }
    }
});
