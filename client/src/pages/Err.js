import Navbar from "../components/Navbar/Navbar.js";
import {Paper, Typography} from "@mui/material";

const Err = () => {
    return (
        <>
            <Navbar/>
            <Paper square elevation={0} sx={{width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems: 'center'}} >
            <Typography variant="h1" fontWeight={600} color='#313131'>404</Typography><br/>
            </Paper>
        </>
    )
}

export default Err;
