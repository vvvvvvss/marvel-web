import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/system";
import { Typography, Divider, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import TaskCard from "./TaskCard.js";
import {editCourse} from '../actions/other.js';
import {useParams} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";

const LandTPage = () => {
    const {syllabus, isSyllabusLoading} = useSelector(state => state.dashboard);
    const {authUser} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {id} = useParams();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectIndex, setSelectIndex] = useState({index:"",id:""});

    const handleModify = (operation, tskIndex, lvIndex)=>{
        dispatch(editCourse(id , operation, tskIndex,["addLevel","addTask"].includes(operation)?lvIndex: selectIndex.index,0,selectIndex.id));
    };

    useEffect(() => {
        setConfirmOpen(false);
        setSelectIndex({index:"",id:""});     
    }, [id])

    return (
        <div>
            <Dialog open={confirmOpen} onClose={()=>(setConfirmOpen(false))}>
            <DialogTitle>
            Are you sure?
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete Level {Number(selectIndex.index)+1} ? This CANNOT be undone.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>(setConfirmOpen(false))} variant="outlined" color='secondary'>Disagree</Button>
            <Button onClick={()=>{handleModify('deleteLevel',0);setConfirmOpen(false)}} variant="contained" color="error" >
                Agree
            </Button>
            </DialogActions>
            </Dialog>
        <Divider textAlign="center" sx={{marginTop:'15px'}}> 
            <Chip variant="outlined" onClick={()=>(handleModify('addLevel',0, 0))}
            clickable label="Add new Level here" color="primary" /> 
        </Divider>
        <Box sx={{display:'grid',gridTemplateColumns: '1fr 1fr', justifyItems:'center',width:'max-content',minWidth:'750px',gap:'20px', opacity:`${isSyllabusLoading?'0.4':'1'}`, pointerEvents:`${isSyllabusLoading? 'none':'auto'}`}} >
        {/* zeroth index level add */}
        {syllabus?.levels?.map((lvl, lvIndex)=>(
        <div key={lvIndex} style={{maxWidth:'500px', width:"100%"}}>
        <br/>
        <Typography variant='heading' component='div' style={{justifyContent:'space-between',display:'flex'}} key={lvl.lvIndex}>&nbsp;&nbsp;
            {`Level  ${lvIndex+1}`}
            {(authUser.currentRole==="INS"&&authUser.currentInsCourse.includes(id))&& 
            <IconButton size="small" sx={{marginRight:'15px',color:'secondary.light'}} onClick={()=>{setSelectIndex({id:lvl?._id,index:lvIndex});setConfirmOpen(true);}}>
                <DeleteIcon/>
            </IconButton>}
        </Typography>
        {(authUser.currentRole==="INS"&&authUser.currentInsCourse.includes(id))&& 
        // zeroth index task add
        <Divider textAlign="center" sx={{marginTop:'15px'}}> 
            <Chip variant="outlined" onClick={()=>(handleModify('addTask',0, lvIndex))}
            clickable label="Add new Task here"  /> 
        </Divider>}
        { lvl.tasks.map((tsk, tskIndex)=>{
            return(
                <div key={tskIndex}>
                <TaskCard tsk={tsk} tskIndex={tskIndex} lvIndex={lvIndex} key={tskIndex}/>
                {(authUser.currentRole==="INS"&&authUser.currentInsCourse.includes(id))&& 
                <Divider  textAlign="center" sx={{marginTop:'15px'}}> 
                    <Chip variant="outlined" onClick={()=>(handleModify("addTask",tskIndex+1, lvIndex))}
                    clickable label="Add new Task here"  /> 
                </Divider>}
                </div>
            )
        })}
        {(authUser.currentRole==="INS"&&authUser.currentInsCourse.includes(id))&& 
        <Divider textAlign="center" sx={{marginTop:'15px'}}> 
            <Chip variant="outlined" onClick={()=>(handleModify('addLevel',0, lvIndex+1))}
            clickable label="Add new Level here" color="primary" />
        </Divider>
        }
        </div>
        ))
        }
        </Box>
        </div>
    )
}

export default LandTPage;
