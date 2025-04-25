import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import Button from "../common/Button";
import { logout } from "../../redux/authSlice";

export default function Settings() {

    const { user, loading } = useSelector((state: RootState) => state.auth);

    return (
        <div className='absolute inset-0 flex justify-center items-center bg-slate-600/50'>
            <div className="flex flex-col gap-2 bg-white p-8 rounded-lg min-w-[300px]">
                <h2 className="text-lg font-semibold mb-2">Account Settings</h2>
                <div className="flex items-center gap-2 mb-2">
                    <span className="h-[40px] w-[40px] rounded-full p-1 bg-purple-500 flex justify-center items-center text-white font-bold">{user?.[0].toUpperCase()}</span>
                    <h2 className="font-semibold">{user}</h2>
                </div>
                <Button type="button" loading={loading} buttonName='Log Out' onClick={logout} />
                <Button type="button" loading={loading} buttonName='Delete Account' onClick={logout} bgColor="bg-red-500" />
            </div>
        </div>
    )
}
