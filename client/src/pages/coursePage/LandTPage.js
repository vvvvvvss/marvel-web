import { Box } from "@mui/system";
import { Typography, Divider, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import TaskCard from "./TaskCard.js";
import {useParams} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState, memo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCourseData, editCourse } from "../../API/index.js";
import useAuth from "../../utils/hooks/useAuth.js";

//this handles adding task, adding level, deleting level. deleting task and editing level is in TaskCard component.
//lvIndex and tskIndex start with 0. they are indexes in array.
//since taskId doesn't matter in these, it is manually set to null in mutation function.
const LandTPage = () => {
    const {authUser} = useAuth();
    const queryClient = useQueryClient();
    const {id} = useParams();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectIndex, setSelectIndex] = useState({index:"",id:""});

    useEffect(() => {
        setConfirmOpen(false);
        setSelectIndex({index:"",id:""});     
    }, [id]);

    const {data, isLoading} = useQuery([{courseCode:id, scope:'levels'}],
        ()=>(getCourseData(id, 'levels')),
        {
            onError:()=>(alert("Something went wrong."))
        }
    );

    const {mutate:handleModify, isLoading:isMutating} = useMutation(
        ({operation, tskIndex, lvIndex})=>
        editCourse(id, operation, tskIndex, operation==='deleteLevel' ? selectIndex.index : lvIndex , null, selectIndex?.id, null),
        {
            onSuccess:(response)=>{
                if(response?.status==='delete-mess'){
                    alert("Students have submitted Project reports for that level. Deleting that level will render those Project reports meaningless.");
                }else if(response?.status==='add-mess'){
                    alert("Students have submitted Project reports for a level in that index. Inserting a level there will cause a shift in levels. Please find alternative ways to do what you are doing.");
                }else if(response?.status==='500'){
                    alert("Looks like somebody else is also editing this course right now. Because you both have different versions of data that didn't match, we rejected your request to prevent problems. we have updated your page with latest data.");
                }else if(['BRUH',"404","403","401"].includes(response?.status)){
                    alert("Something went wrong:(");
                }
                if(["201","500"].includes(response?.status)){
                    queryClient.setQueryData([{courseCode:id, scope:'levels'}], ()=>({...response, status:'200'}));
                    if(response?.status=='201'){
                        alert("Done!");
                    }
                }
            }
        });

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
            <Button onClick={()=>{handleModify({operation:'deleteLevel',tskIndex: null, lvIndex:selectIndex?.index});setConfirmOpen(false)}} variant="contained" color="error" >
                Agree
            </Button>
            </DialogActions>
            </Dialog>
        {/* ZEROTH INDEX LEVEL ADD */}
        {(authUser?.currentRole==="INS"&&authUser?.currentInsCourse.includes(id))&&
        <Divider textAlign="center" sx={{marginTop:'15px'}}> 
            <Chip variant="outlined" onClick={()=>(handleModify({operation:'addLevel',tskIndex: null,lvIndex: 0}))}
            clickable label="Add new Level here" color="primary" disabled={(isLoading || isMutating)} /> 
        </Divider>}
        <Box sx={{display:'grid',gridTemplateColumns: {xl:'1fr 1fr 1fr',lg:'1fr 1fr',md:'1fr'}, justifyItems:'center',width:{xs:'100%',md:"max-content"},minWidth:{md:'750px',xs:'100%'},gap:'20px', 
        opacity:`${(isLoading || isMutating)?'0.4':'1'}`, pointerEvents:`${(isLoading || isMutating)? 'none':'auto'}`}} >
    
        {data?.course?.levels?.map((lvl, lvIndex)=>(
        <Box key={lvIndex} sx={{maxWidth:'500px',padding:{xs:'16px',sm:'0px'}}}>
        <br/>
        <Typography variant='heading' component='div' style={{justifyContent:'space-between',display:'flex'}} key={lvl.lvIndex}>&nbsp;&nbsp;
            {`Level  ${lvIndex+1}`}
            {(authUser?.currentRole==="INS"&&authUser?.currentInsCourse?.includes(id))&& 
            <IconButton size="small" sx={{marginRight:'15px',color:'secondary.light'}} onClick={()=>{setSelectIndex({id:lvl?._id,index:lvIndex});setConfirmOpen(true);}}>
                <DeleteIcon/>
            </IconButton>}
        </Typography>
        {(authUser?.currentRole==="INS"&&authUser?.currentInsCourse?.includes(id))&& 
        // zeroth index task add
        <Divider textAlign="center" sx={{marginTop:'15px'}}> 
            <Chip variant="outlined" onClick={()=>(handleModify({operation:'addTask',tskIndex: 0,lvIndex: lvIndex}))}
            clickable label="Add new Task here"  /> 
        </Divider>}
        { lvl?.tasks?.map((tsk, tskIndex)=>{
            return(
                <div key={tskIndex}>
                <TaskCard tsk={tsk} tskIndex={tskIndex} lvIndex={lvIndex} key={tskIndex}/>
                {(authUser?.currentRole==="INS"&&authUser?.currentInsCourse?.includes(id))&& 
                <Divider  textAlign="center" sx={{marginTop:'15px'}}> 
                    <Chip variant="outlined" onClick={()=>(handleModify({operation:"addTask",tskIndex: tskIndex+1,lvIndex: lvIndex}))}
                    clickable label="Add new Task here"  /> 
                </Divider>}
                </div>
            )
        })}
        {(authUser?.currentRole==="INS"&&authUser?.currentInsCourse?.includes(id))&& 
        <Divider textAlign="center" sx={{marginTop:'15px'}}> 
            <Chip variant="outlined" onClick={()=>(handleModify({operation:'addLevel',tskIndex: null,lvIndex:lvIndex+1}))}
            clickable label="Add new Level here" color="primary" />
        </Divider>
        }
        </Box>
        ))
        }
        </Box>
        </div>
    )
}

export default memo(LandTPage);
