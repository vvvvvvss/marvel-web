import { useQuery } from "react-query";
import { auth } from "../../API";
import { useNavigate } from "react-router-dom";

export default ()=>{
    const navigate = useNavigate();
    const {data, isLoading, refetch:fetchAuth} = useQuery(['auth'], ()=>(auth()), {
        enabled:!["undefined","",null,undefined].includes(sessionStorage.getItem('deez')),
        onSuccess:(data)=>{
            if(data?.status==='404'){
                navigate('/404');
            }else if(data?.status==='BRUH'){
                alert("Something went wrong.");
            }
        },
        onError:()=>alert("Something went wrong.")
    });

    return {authUser: data?.authUser, isLoading, fetchAuth};
}