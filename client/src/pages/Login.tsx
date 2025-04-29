import { NavLink } from 'react-router-dom';

import Form from '../components/Form'
import { login } from '../redux/authThunks';

function Login() {

  return (
    <div className='form-container'>
      <h2 className='text-lg font-medium'>Login to your account</h2>
      <Form action={login} buttonName="Login" />
      <div className='text-sm flex flex-col text-primary-blue font-semibold items-center'>
        <NavLink className='hover:underline' to='/accountRecovery' replace>Forget Password</NavLink>
        <NavLink className='hover:underline' to='/signUp' replace>Sign up</NavLink>
      </div>
    </div>
  )
}

export default Login