import { Button, useScrollTrigger } from "@mui/material";
import { Slide, AppBar, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

const Navbar = () => {
    const trigger = useScrollTrigger();
    const [authModal, setAuthModal] = useState(false);
    return (
        <div>
            <Slide appear={false} direction="down" in={!trigger}>
            <AppBar>
            <Toolbar style={{display:'flex', justifyContent:'space-between'}}>
                <Typography variant="h6" component="div">
                UVCE MARVEL
                </Typography>
                <Button variant='outlined'>Sign In</Button>
            </Toolbar>
            </AppBar>
            </Slide>
        </div>
    )
}

export default Navbar
