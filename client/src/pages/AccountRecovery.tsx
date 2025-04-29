import { useEffect, useState } from "react";
import { changePassword, searchUser } from "../redux/authThunks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

export default function AccountRecovery() {

    const { user, error } = useSelector((state: RootState) => state.auth)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if (password.trim() && confirmPassword.trim()) {
            setButtonDisabled(password !== confirmPassword);
        } else {
            setButtonDisabled(true);
        }
    }, [password, confirmPassword]);

    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()

    const handleUserSearch = async () => {
        dispatch(searchUser(email))
    };

    const handleChangePassword = async () => {
        const result = await dispatch(changePassword({ email, password }));

        if (changePassword.fulfilled.match(result)) {
            navigate('/');
        }
    };


    return (
        <div className="form-container">
            <h2 className='text-lg font-medium'>Account Recovery</h2>
            {!user
                ?
                (<>
                    <label htmlFor="email_input" className="text-sm">Step 1 - Enter your registered email</label>
                    <input key='email' type="email" id="email_input" onChange={(e) => setEmail(e.target.value)} value={email} />
                    {error && <p className="error">{error}</p>}
                    <Button buttonName="Proceed" onClickHandler={handleUserSearch} />
                </>) : (<>
                    <h2 className="text-sm">Step 2 - Choose password</h2>
                    <input key='password' type="text" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <input key='confirm password' type="text" placeholder="Confirm New Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    <Button buttonName="Update Password" onClickHandler={handleChangePassword} disabled={buttonDisabled} />
                </>)
            }
        </div >
    )
}
