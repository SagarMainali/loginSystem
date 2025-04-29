import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AsyncThunk } from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../redux/store';
import { clearError } from '../redux/authSlice';
import '../styles/loader.css'
import Button from './common/Button';

type FormProps = {
    action: AsyncThunk<any, { email: string; password: string }, any>;
    buttonName: string;
};

type Formdata = {
    email: string;
    password: string
}

function Form({ action, buttonName }: FormProps) {

    const [formdata, setFormdata] = useState<Formdata>({
        email: '',
        password: ''
    })

    const dispatch = useDispatch<AppDispatch>()

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const { pathname } = useLocation()

    const navigate = useNavigate()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormdata(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await dispatch(action(formdata));
        
        // clear form data upon succesful dispatch and navigate to home
        // result.type.includes('login') && 
        if (action.fulfilled.match(result)) {
            setFormdata({
                email: '',
                password: ''
            })
            // specifically navigate to the root path when you need to see the state changes but the root path is currently not rendered with the DOM tree
            navigate('/');
        }
    };

    useEffect(() => {
        dispatch(clearError());
    }, [pathname])

    return (
        <form onSubmit={handleSubmission} className='flex flex-col gap-3'>
            <input type='email' placeholder='Email' name='email' onChange={handleChange} value={formdata.email}/>
            <input type='password' placeholder='Password' name='password' onChange={handleChange} value={formdata.password} />
            <Button loading={loading} buttonName={buttonName} bgColor={buttonName === 'Delete Account' ? 'bg-red-500' : undefined} />
            {error && <p className='error'>{error}</p>}
        </form>
    )
}

export default Form