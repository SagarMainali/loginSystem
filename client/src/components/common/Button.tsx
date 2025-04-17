type ButtonProps = {
    loading: boolean;
    buttonName: string;
    type?: 'button' | 'submit';
    onClick?: () => void;
}

function Button({ loading, buttonName, onClick, type = 'submit' }: ButtonProps) {
    return (
        <button type={type} className='py-2 px-4 bg-primary-blue rounded-lg text-white font-semibold flex justify-center items-center disabled:bg-primary-blue/50'
            disabled={loading}
            onClick={onClick}>
            {
                loading ? <span className="loader"></span> : buttonName
            }
        </button>
    )
}

export default Button