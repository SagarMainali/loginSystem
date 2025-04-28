import { useDispatch } from "react-redux"

import { AppDispatch } from '../../redux/store';

type ButtonProps = {
    loading?: boolean;
    buttonName: string;
    type?: 'button' | 'submit';
    onClickHandler?: () => any;
    bgColor?: string
}

function Button({ loading = false, buttonName, onClickHandler, type = 'submit', bgColor = 'bg-primary-blue' }: ButtonProps) {

    const dispatch = useDispatch<AppDispatch>()

    return (
        <button type={type} className={`py-2 px-4 rounded-lg text-white font-semibold flex justify-center items-center disabled:bg-primary-blue/50 ${bgColor}`}
            disabled={loading}
            onClick={() => onClickHandler && dispatch(onClickHandler())}>
            {
                loading ? <span className="loader"></span> : buttonName
            }
        </button>
    )
}

export default Button