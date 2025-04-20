import { useDispatch } from "react-redux"
import { AppDispatch } from '../../redux/store';

type ButtonProps = {
    loading: boolean;
    buttonName: string;
    type?: 'button' | 'submit';
    onClick?: () => any
}

function Button({ loading, buttonName, onClick, type = 'submit' }: ButtonProps) {

    const dispatch = useDispatch<AppDispatch>()

    return (
        <button type={type} className='py-2 px-4 bg-primary-blue rounded-lg text-white font-semibold flex justify-center items-center disabled:bg-primary-blue/50'
            disabled={loading}
            onClick={() => onClick && dispatch(onClick())}
        >
            {
                loading ? <span className="loader"></span> : buttonName
            }
        </button>
    )
}

export default Button