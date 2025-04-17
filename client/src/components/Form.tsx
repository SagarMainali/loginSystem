import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import { AppDispatch, RootState } from '../redux/store';
import { clearError } from '../redux/authSlice';
import '../styles/loader.css'
import Button from './common/Button';

type FormProps = {
    action: (formdata: { email: string; password: string }) => any;
    buttonName: string;
};

type Formdata = {
    email: string;
    password: string
}

function Form({ action, buttonName }: FormProps) {

    const [formdata, setFormdata] = useState<Formdata>({} as Formdata)

    const dispatch = useDispatch<AppDispatch>()

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const { pathname } = useLocation()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormdata(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(action(formdata));
    };

    useEffect(() => {
        dispatch(clearError());
    }, [pathname])

    return (
        <form onSubmit={handleSubmission} className='flex flex-col gap-3'>
            <input type='text' placeholder='Email' name='email' onChange={handleChange} />
            <input type='password' placeholder='Password' name='password' onChange={handleChange} />
            <Button loading={loading} buttonName={buttonName} />
            {error && <p className='error -mt-2'>{error}</p>}
        </form>
    )
}

export default Form