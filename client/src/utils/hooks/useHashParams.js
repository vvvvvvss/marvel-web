import {  useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default ()=>{
    const paramObject = {};
    const location = useLocation();
    const navigate = useNavigate();
    if(location.hash !== ''){
        location.hash?.slice(1)?.split('&')?.forEach((h)=>{
            const [key,value] = h?.split('=');
            paramObject[key] = value;
        })
    }
    
    return paramObject;
}