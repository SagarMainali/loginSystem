import { NavLink } from 'react-router-dom';

import Form from '../components/Form'
import { signup } from '../redux/authThunks';

function SignUp() {

    return (
        <div className='form-container relative'>
            <h2 className='text-lg font-medium'>Create account</h2>
            <Form action={signup} buttonName="Sign Up" />
            <p className='text-sm'>Already have an account? <NavLink className='text-primary-blue font-semibold' to='/login' replace>Login</NavLink></p>
        </div>
    )
}

export default SignUp