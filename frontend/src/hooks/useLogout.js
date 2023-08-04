import { useDispatch } from "react-redux"
import { userLogout} from '../Store/Slices/userSlice';
import { personLogout} from '../Store/Slices/personSlice';
export const useLogout=()=>{
     
    const dispatch = useDispatch();

    const logout=()=>{
        localStorage.removeItem('user');
        dispatch(userLogout());
        dispatch(personLogout());
    }

    return {logout};
}