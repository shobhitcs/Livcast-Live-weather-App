import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin} from '../Store/Slices/userSlice';
import { personLogin} from '../Store/Slices/personSlice';
export const useLogin=()=>{
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(null);
    const dispatch=useDispatch();

    const login=async (email,password)=>{
        setIsLoading(true);
        setError(null);

        const response = await fetch('https://skycast-api.onrender.com/api/user/login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})
        })
        const json=await response.json();
        // console.log(json,12345453442344);
        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok){
            const dataresponse = await fetch('https://skycast-api.onrender.com/api/data/findperson',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': `Bearer ${json.email} ${json.token}`},
                body: JSON.stringify({email})
            })
            // console.log(dataresponse,6384);
            const datajson=await dataresponse.json();
            // console.log(datajson,5698);
            if(!dataresponse.ok){
                setIsLoading(false);
                setError(datajson.error);
            }
            if(dataresponse.ok){
            localStorage.setItem('user', JSON.stringify(json));
            setIsLoading(false);
            dispatch(userLogin(json));
            dispatch(personLogin(datajson));
            }
        }
    }
    return {login,isLoading,error};
}