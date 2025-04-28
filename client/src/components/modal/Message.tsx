import { useSelector } from "react-redux"

import { RootState } from "../../redux/store";
import { resetModal } from '../../redux/authSlice';
import Button from "../common/Button";

function Message() {

    const { modal: { message } } = useSelector((state: RootState) => state.auth);

    return (
        <div className="bg-slate-50 rounded-md p-8 flex items-center gap-2">
            <p>{message}</p>
            <Button buttonName='OK' onClickHandler={resetModal}/>
            {/* no need to navigate to '/' path because this modal is already rendered on the home path */}
        </div>
    )
}

export default Message