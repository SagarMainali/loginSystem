import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";

import Button from "../components/common/Button";
import { logout } from '../redux/authSlice';
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const { loading, token } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/auth', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setEmail(response.data.email);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (!token) {
        navigate("/")
    }

    return (
        <div className='h-screen flex justify-center items-center gap-2 flex-col'>
            <p className='text-lg'>Welcome <strong>{email}!</strong> to the Dashboard</p>
            <Button type="button" loading={loading} buttonName='Log Out' onClick={logout} />
        </div>
    )
}

export default Dashboard