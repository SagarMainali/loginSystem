import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const { token } = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState("");

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

    return (
        <div className='h-full flex justify-center items-center gap-2 flex-col'>
            <p className='text-xl'>Welcome to Dashboard</p>
            <h2>User: {email}</h2>
            <div>*Dashboard content here*</div>
        </div>
    )
}

export default Dashboard