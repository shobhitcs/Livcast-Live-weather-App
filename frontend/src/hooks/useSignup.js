import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin} from '../Store/Slices/userSlice';
import { personLogin} from '../Store/Slices/personSlice';

export const useSignup=()=>{
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(null);
    const dispatch=useDispatch();
    
    
    const signup=async (formData)=>{
        const {name,email,password}=formData;
        // console.log(name,email,isStudent,rollnumber,password);
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/user/signup',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})
        })
        const json=await response.json();
        // console.log(json,5456955);
        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        if(response.ok){
            const dataresponse = await fetch('/api/data/addperson',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                'Authorization': `Bearer ${json.email} ${json.token}`},
                body: JSON.stringify({name,email})
            })
            
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
    return {signup,isLoading,error};
}