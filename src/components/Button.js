import React from 'react';

const Button = ({text, onClick, type = 'button', ...rest}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            {...rest}
            className="bg-[#0095F6] flex justify-center items-center w-full pt-2 pb-2 rounded-lg font-sans font-medium text-sm text-white self-center">
            {text}
        </button>
    )
}

export default Button;