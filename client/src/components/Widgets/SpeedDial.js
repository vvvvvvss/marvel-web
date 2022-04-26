import {useState} from 'react';
import { Backdrop,SpeedDial,SpeedDialAction,} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CreateIcon from '@mui/icons-material/Create';
import ReceiptIcon from '@mui/icons-material/Receipt';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import {useNavigate} from "react-router-dom";
import { useQuery } from 'react-query';
import { hasSubmittedPr} from '../../API/index.js';
import useAuth from '../../utils/hooks/useAuth.js';

const Dial = () => {
    const navigate = useNavigate();
    const {authUser} = useAuth();
    const [dial, setDial] = useState(false);

    const {data:metaDataOfSubmission, isLoading:hasSubmittedPrLoading} = useQuery(['hasSubmittedPr', {authUser:authUser?.id}],
        ()=>(hasSubmittedPr()),
        {
            onerror : ()=>{
                alert("Something went wrong");
            },
            enabled: authUser?.currentRole==='STU'
        }
    );
    const hasSubmitted = metaDataOfSubmission?.meta;

    return (
    <>
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
            onClick={()=>(navigate({hash:"#mode=form&type=blog"}))}
        />
            {(authUser?.currentRole==='STU') &&
            (!hasSubmitted?.[authUser?.currentLevel]&&!hasSubmittedPrLoading) 
            &&
            <SpeedDialAction
            tooltipTitle={`Project Report Lv ${authUser?.currentLevel}`}
            tooltipOpen  sx={{whiteSpace : 'nowrap'}}
            icon={<AssignmentIcon/>} 
            onClick={()=>(navigate({hash:"#mode=form&type=pr"}))}
        />}
        {authUser?.currentRole==='INS' &&
        <SpeedDialAction
        tooltipTitle={`Resource Article`}
        tooltipOpen sx={{whiteSpace:'nowrap'}}
        icon={<ReceiptIcon/>}
        onClick={()=>(navigate({hash:"#mode=form&type=rsa"}))}
        />
        }
    </SpeedDial>
    </>
    )
}

export default Dial;
