import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export default ()=>{
    const location = useLocation();

    const params = useMemo(() => {
        let paramObj={};
        if(location.hash !== ''){
            location.hash?.slice(1)?.split('&')?.forEach((h)=>{
                const [key,value] = h?.split('=');
                paramObj[key] = value;
            })
        }
        return paramObj;
    }, [location?.hash])
    
    return params;
}