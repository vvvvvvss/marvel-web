const tokenRefresher = (res) => {
    const timeToRefresh = 20*60*1000;
    const refresh = async()=>{
        const newToken = await res.reloadAuthResponse().catch((err)=>(console.log(err)));
        sessionStorage.setItem('deez', newToken.id_token);
        setTimeout(refresh, timeToRefresh);
    }

    setTimeout(refresh, timeToRefresh);
}

export default tokenRefresher;