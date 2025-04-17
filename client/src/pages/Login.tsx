import { NavLink } from 'react-router-dom';

import Form from '../components/Form'
import { login } from '../redux/authThunks';

function Login() {

  return (
    <div className='form-container'>
      <h2 className='text-lg font-medium'>Login to your account</h2>
      <Form action={login} buttonName="Login" />
      <p className='text-sm'>Don't have an account? <NavLink className='text-primary-blue font-semibold' to='/signUp' replace>Sign up</NavLink></p>
    </div>
  )
}

export default Login