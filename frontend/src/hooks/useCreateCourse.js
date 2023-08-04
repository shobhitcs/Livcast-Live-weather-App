import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const useCreateCourse=()=>{
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(null);
    const dispatch=useDispatch();
}