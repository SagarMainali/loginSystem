import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import Button from "../common/Button";
import { logout, toggleDelete } from "../../redux/authSlice";
import Deletion from "./Deletion";

export default function Settings() {

    const { user, loading, modal: { deletion } } = useSelector((state: RootState) => state.auth);

    return (
        <div className="flex flex-col gap-2 bg-white p-8 rounded-lg min-w-[300px]" >
            {
                !deletion
                    ? (<>
                        <h2 className="text-lg font-semibold mb-2" > Account Settings</h2>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-[40px] w-[40px] rounded-full p-1 bg-purple-500 flex justify-center items-center text-white font-bold">{user?.[0].toUpperCase()}</span>
                            <h2 className="font-semibold">{user}</h2>
                        </div>
                        <Button type="button" loading={loading} buttonName='Log Out' onClickHandler={logout} />
                        <Button type="button" loading={loading} buttonName='Delete Account' onClickHandler={toggleDelete} bgColor="bg-red-500" />
                    </>
                    ) : (
                        <Deletion />
                    )}
        </div>
    )
}
