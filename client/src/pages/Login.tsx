import { Navigate, NavLink } from 'react-router-dom';

import Form from '../components/Form'
import { login } from '../redux/authThunks';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function Login() {

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='form-container'>
      <h2 className='text-lg font-medium'>Login to your account</h2>
      <Form action={login} buttonName="Login" />
      <p className='text-sm'>Don't have an account? <NavLink className='text-primary-blue font-semibold' to='/signUp' replace>Sign up</NavLink></p>
    </div>
  )
}

export default Login