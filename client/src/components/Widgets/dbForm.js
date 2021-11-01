import { AppBar, Toolbar, IconButton,Typography,Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const DbForm = ({setFormOpen, type}) => {
    console.log('rendered')
    return (
        <>
        <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
            <IconButton
            edge="start"
            color="inherit"
            onClick={()=>{setFormOpen(false);}}
            aria-label="close"
            >
            <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {type==='PR' ? 'Project Report' : 'Blog'}
            </Typography>
            <Button autoFocus color="inherit">
            save
            </Button>
        </Toolbar>
        </AppBar>
        </>
    )
}

export default DbForm;
