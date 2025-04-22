import { NavLink } from 'react-router-dom';

import Form from '../components/Form'
import { signup } from '../redux/authThunks';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import Modal from '../components/modal/Modal';

function SignUp() {

    const { showModal } = useSelector((state: RootState) => state.auth);

    if (showModal) {
        return <Modal />
    }

    return (
        <div className='form-container'>
            <h2 className='text-lg font-medium'>Create account</h2>
            <Form action={signup} buttonName="Sign Up" />
            <p className='text-sm'>Already have an account? <NavLink className='text-primary-blue font-semibold' to='/login' replace>Login</NavLink></p>
        </div>
    )
}

export default SignUp