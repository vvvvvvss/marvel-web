import {useState} from 'react';
import { Backdrop,SpeedDial,SpeedDialAction,} from '@mui/material';
import BookIcon from '@mui/icons-material/AutoStories';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch, useSelector } from 'react-redux';

const Dial = () => {
    const {authUser} = useSelector(state => state.auth);
    const [dial, setDial] = useState(false);
    const {syllabus, submissions : {prs}} = useSelector(state => state.dashboard);
    const dispatch = useDispatch();

    return (
        <div>
            <Backdrop open={dial} />
            <SpeedDial
                ariaLabel="start writing"
                sx={{ position: 'fixed', bottom: 25, right: 25  }}
                icon={<><CreateIcon/>&nbsp;&nbsp;write</>} 
                FabProps={{variant:'extended'}}
                onClose={()=>(setDial(false))}
                onOpen={()=>(setDial(true))}
                open={dial}
            >
                <SpeedDialAction
                    tooltipTitle={`Blog`}
                    tooltipOpen sx={{whiteSpace : 'nowrap'}}
                    icon={<BookIcon/>}
                    onClick={()=>{dispatch({type:'SET_FORM_TYPE',payload:'BLOG'});dispatch({type : 'OPEN_FORM'});}}
                />
                 {syllabus?.submissionStatus?.isAccepting && !prs.some((i)=>(i.level === authUser?.currentLevel))
                  &&
                  <SpeedDialAction
                    tooltipTitle={`Project Report Lvl ${syllabus?.submissionStatus?.forLevel}`}
                    tooltipOpen  sx={{whiteSpace : 'nowrap'}}
                    icon={<AssignmentIcon/>}
                    onClick={()=>{dispatch({type:'SET_FORM_TYPE',payload:'PR'});dispatch({type : 'OPEN_FORM'});}}
                />}
            </SpeedDial>
        </div>
    )
}

export default Dial;
