import {Paper, Typography, Step, Stepper, Divider} from '@mui/material';

const CertificateCard = ({certificate}) => {
  return (
    <Paper variant='widget' sx={{opacity: certificate?.baked ? '1' : '0.4',
    padding:'20px', borderRadius:'12px', width:'100%', maxWidth:'400px'}} >
      <Typography variant='h4' sx={{color:'primary.light'}} >
        {certificate?.courseCode}
      </Typography>
    <Typography variant='caption' >{`Level ${certificate?.level}`}</Typography>
    <br/>
    <Divider/>
    { !certificate?.baked && 
    <Typography variant='caption'  >
      Course in Progress!. Certificate will be ready to mint after course completion.
    </Typography>
    }
    </Paper>
  )
}

export default CertificateCard;