import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { personSaveSearch } from '../Store/Slices/personSlice';

export const useSaveSearch = () => {
    const [saveError, setSaveError] = useState(null);
    const [isSaveLoading, setIsSaveLoading] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);

    const saveSearch = async (email, city) => {
        setIsSaveLoading(true);
        setSaveError(null);

        const dataresponse = await fetch('https://skycast-api.onrender.com/api/data/saverecent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${email} ${user.token}`
            },
            body: JSON.stringify({ email, city })
        })

        const datajson = await dataresponse.json();
        // console.log(datajson,5698);
        if (!dataresponse.ok) {
            setIsSaveLoading(false);
            setSaveError(datajson.error);
        }
        if (dataresponse.ok) {
            setIsSaveLoading(false);
            // console.log(datajson,9865);
            // dispatch(userLogin(json));
            dispatch(personSaveSearch(datajson.searches));
        }
    }
    return { saveSearch, isSaveLoading, saveError };
}