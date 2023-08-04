import { useDispatch } from 'react-redux';
import { userLogin } from '../Store/Slices/userSlice';
import { personLogin } from '../Store/Slices/personSlice';
import { useState } from 'react';

export const useVerifyUser = () => {
    const [isVerifying, setIsVerifying] = useState(true);
    const dispatch = useDispatch();
    const verifystate = async () => {
        setIsVerifying(true);
        let local = JSON.parse(localStorage.getItem('user'));
        // console.log(local.email,local.token);
        if (local) {

            const response = await fetch('/api/data/findperson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${local.email} ${local.token}`
                },
                body: JSON.stringify({email: local.email})
            })
            const json = await response.json();
            // console.log(json);
            if (response.ok) {
                dispatch(userLogin(local));
                dispatch(personLogin(json));
            }
        }
        
        setIsVerifying(false); 
    }
    return { verifystate, isVerifying };
}