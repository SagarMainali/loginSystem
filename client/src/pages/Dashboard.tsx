import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Button from "../components/common/Button";
import { logout } from '../redux/authSlice';

function Dashboard() {

    const { isLoggedIn, user, loading } = useSelector((state: RootState) => state.auth);

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className='h-screen flex justify-center items-center gap-2 flex-col'>
            <p className='text-lg'>Welcome <strong>{user}!</strong></p>
            <Button type="button" loading={loading} buttonName='Log Out' onClick={logout} />
        </div>
    )
}

export default Dashboard