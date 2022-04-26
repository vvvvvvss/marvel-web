export default (status) => {
    if(status==='PENDING') return 'warning';
    else if (status==='FLAGGED') return 'error';
    else if (status==='APPROVED' || 'FEATURED') return 'success';
}