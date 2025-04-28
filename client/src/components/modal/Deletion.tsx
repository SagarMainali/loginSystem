import { deleteUser } from '../../redux/authThunks';
import Button from '../common/Button';
import Form from '../Form';
import { toggleDelete } from "../../redux/authSlice";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function Deletion() {

    const { loading } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <h2 className="text-lg font-semibold mb-2" > Delete Account</h2>
            <h3 className='text-xs'>Enter your credentials to delete your account</h3>
            <Form action={deleteUser} buttonName="Delete Account" />
            <Button type="button" loading={loading} buttonName='Cancel' onClickHandler={toggleDelete} />
        </>
    )
}
