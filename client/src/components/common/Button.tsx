type ButtonProps = {
    buttonName: string;
    loading?: boolean;
    type?: 'button' | 'submit';
    onClickHandler?: () => void | Promise<void>;
    bgColor?: string;
    disabled?: boolean;
}

function Button({ loading = false, buttonName, onClickHandler, type = 'submit', bgColor = 'bg-primary-blue', disabled }: ButtonProps) {

    return (
        <button type={type} className={`py-2 px-4 rounded-lg text-white font-semibold flex justify-center items-center disabled:bg-slate-400 ${bgColor}`}
            disabled={disabled || loading}
            onClick={() => onClickHandler && onClickHandler()}>
            {
                loading ? <span className="loader"></span> : buttonName
            }
        </button>
    )
}

export default Button