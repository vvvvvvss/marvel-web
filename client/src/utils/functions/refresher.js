const tokenRefresher = (res) => {
    const timeToRefresh = 20*60*1000;
    const refresh = async()=>{
        const newToken = await res.reloadAuthResponse().catch((err)=>(console.log(err)));
        console.log('new token recieved', newToken);
        sessionStorage.setItem('deez', newToken.tokenId);
        setTimeout(refresh, timeToRefresh);
    }

    setTimeout(refresh, timeToRefresh);
}

export default tokenRefresher;