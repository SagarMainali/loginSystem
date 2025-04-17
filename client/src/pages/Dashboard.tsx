import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Button from "../components/common/Button";
import { logout } from '../redux/authSlice';

function Dashboard() {

    const { user } = useSelector((state: RootState) => state.auth);
    const { loading } = useSelector((state: RootState) => state.auth);

    return (
        <div className='h-screen flex justify-center items-center gap-2 flex-col'>
            <p className='text-lg font-medium'>Welcome {user}!</p>
            <Button type="button" loading={loading} buttonName='Log Out' onClick={logout} />
        </div>
    )
}

export default Dashboard