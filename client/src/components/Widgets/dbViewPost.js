import { Dialog, Typography, IconButton,AppBar,Toolbar, } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { getPost } from "../../actions/dashboard.js";

const DbViewPost = () => {
    const {viewPostOpen, viewPostId, viewPostType, viewPost} = useSelector(state => state.dashboard);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost(viewPostType,viewPostId));
    }, [])
    console.log(viewPost);
    return (
        <Dialog open={viewPostOpen} fullScreen onClose={()=>(dispatch({type:'CLOSE_VIEW'}))}>
        <AppBar sx={{ position: 'fixed' }}>
        <Toolbar>
            <IconButton edge="start" onClick={()=>{dispatch({type:'CLOSE_VIEW'});}} ><CloseIcon/></IconButton>
        </Toolbar>
        </AppBar>
        <div style={{marginTop:'90px'}}>
        <Typography>{`${viewPostType}  ${viewPostId}`}</Typography>
        </div>
        </Dialog>
    )
}

export default DbViewPost;
