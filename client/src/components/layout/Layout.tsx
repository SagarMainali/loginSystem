import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Navbar from '../common/Navbar'
import { RootState } from '../../redux/store';
import Modal from '../modal/Modal';

export default function Layout() {

    const { modal: {settings} } = useSelector((state: RootState) => state.auth);

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 relative'>
                <Outlet />
                {settings && <Modal name='settings'/>}
            </div>
        </div>
    )
}
