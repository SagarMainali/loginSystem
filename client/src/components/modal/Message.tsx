import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";

import { RootState, AppDispatch } from "../../redux/store";
import { resetUserAndModal } from '../../redux/authSlice';

function Message() {

    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className="bg-slate-50 rounded-md p-8">
            <p className="mb-1">Welcome <strong>{user}</strong>, you have been registered!</p>
            <p>Proceed to<NavLink className='text-primary-blue font-semibold' to='/login' replace onClick={() => { dispatch(resetUserAndModal()) }}> Login.</NavLink></p>
        </div>
    )
}

export default Message