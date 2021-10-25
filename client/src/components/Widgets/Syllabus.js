import {Paper, Typography, Chip} from '@mui/material'
const Syllabus = () => {
    return (
    <Paper variant='widget' style={{height:'500px'}}>
        <Typography variant='widget-heading'>your syllabus&nbsp;</Typography>
        <Chip label='AI-ML' variant='outlined' color='primary' size='small'/>
        

    </Paper>
    )
}

export default Syllabus;
