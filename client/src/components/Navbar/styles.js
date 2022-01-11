import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    righttoolbar : {
        display: 'flex',justifyContent: 'space-between'
    },
    uvce :{ 
        color: theme.palette.mode==='dark'? '#D7FFF3' :'#9B2D48',
        fontWeight : '700', fontSize: '18px',
        letterSpacing : '0.23em', marginLeft: '30px',
        [theme.breakpoints.down(480)]:{
            fontSize:'16px',marginLeft:'12px',
        }
    },
    marvel : {
        color: theme.palette.mode==='dark'? '#D7FFF3' :'#9B2D48',
       fontWeight : '400', fontSize: '18px',
       letterSpacing : '0.23em',
       [theme.breakpoints.down(480)]:{
           fontSize:'16px',
       }
    },
    logout : {
        [theme.breakpoints.down(480)]:{
            display:"none"
         },
    },
}));

export default useStyles;

