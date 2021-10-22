import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme)=> ({
   window : {
    //    backgroundColor : theme.palette.mode==='dark' ? '#000000' : '#ffffff',
    
       minWidth : '100vw',maxWidth:'100vw',
       minHeight : '100vh',
   },
   dashboard : {
      height: '75px',
      width : '210px',
      fontWeight : '32px',
      fontSize : '32px', textDecoration : 'none'
   },
}));

export default useStyles;