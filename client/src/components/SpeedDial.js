import {useState} from 'react';
import { Backdrop,SpeedDial,SpeedDialAction,} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CreateIcon from '@mui/icons-material/Create';
import { useDispatch, useSelector } from 'react-redux';
import ReceiptIcon from '@mui/icons-material/Receipt';
import NewspaperIcon from '@mui/icons-material/Newspaper';


const Dial = () => {
    const {authUser} = useSelector(state => state.auth);
    const [dial, setDial] = useState(false);
    const {syllabus, submissions : {prs}} = useSelector(state => state.dashboard);
    const dispatch = useDispatch();

    return (
        <div>
            <Backdrop open={dial} />
            <SpeedDial
                ariaLabel='start writing'
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
                    icon={<NewspaperIcon/>}
                    onClick={()=>{dispatch({type:'SET_FORM_TYPE',payload:'BLOG'});dispatch({type : 'OPEN_FORM'});}}
                />
                 {(authUser?.currentRole==='STU') && (authUser?.currentLevel===syllabus?.submissionStatus?.forLevel) &&
                 (syllabus?.submissionStatus?.isAccepting && !prs?.some((i)=>(i?.level === authUser?.currentLevel))) 
                  &&
                  <SpeedDialAction
                    tooltipTitle={`Project Report Lvl ${syllabus?.submissionStatus?.forLevel}`}
                    tooltipOpen  sx={{whiteSpace : 'nowrap'}}
                    icon={<AssignmentIcon/>}
                    onClick={()=>{dispatch({type:'SET_FORM_TYPE',payload:'PR'});dispatch({type : 'OPEN_FORM'});}}
                />}
                {authUser?.currentRole==='INS' &&
                <SpeedDialAction
                tooltipTitle={`Resource Article`}
                tooltipOpen sx={{whiteSpace:'nowrap'}}
                icon={<ReceiptIcon/>}
                onClick={()=>{dispatch({type:'SET_FORM_TYPE', payload :'RSA'});dispatch({type:'OPEN_FORM'});}}
                />
                }
            </SpeedDial>
        </div>
    )
}

export default Dial;
