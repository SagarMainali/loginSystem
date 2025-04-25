import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Settings from '../modal/Settings'
import Navbar from '../common/Navbar'
import { RootState } from '../../redux/store';

export default function Layout() {

    const { showSetting } = useSelector((state: RootState) => state.auth);

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 relative'>
                <Outlet />
                {showSetting && <Settings />}
            </div>
        </div>
    )
}
