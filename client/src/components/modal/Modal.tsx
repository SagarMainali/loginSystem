import { useSelector } from "react-redux"
import { RootState } from "../../redux/store";
import { NavLink } from "react-router-dom";

function Modal() {

    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className="absolute inset-0 z-10 bg-black/50 flex items-center justify-center">
            <div className="bg-slate-50 rounded-md p-8">
                <p className="mb-1">Welcome <strong>{user}</strong>, you have been registered!</p>
                <p>Proceed to<NavLink className='text-primary-blue font-semibold' to='/login' replace> Login.</NavLink></p>
            </div>
        </div>
    )
}

export default Modal