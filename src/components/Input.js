import React from 'react';

const Input = React.forwardRef(({type = 'text', name, placeholder = '', error, ...rest}, ref) => {
    return placeholder !== 'Message' ? (
        <div className={`w-full`} >
            <input
                type={type}
                placeholder={placeholder + '*'}
                name={name}
                className={`w-full bg-stone-800 leading-5 text-xs text-white font-sans p-2 border-solid border-gray-500 border-[1px] rounded
                ${error ? 'border-red-500' : ''}`}
                ref={ref}
                {...rest}
            />
            {error && <span className="text-red-500 text-xs italic">This field is required</span>}
        </div>
    ) : (
        <div>
            <textarea
                type={type}
                placeholder={placeholder + '*'}
                name={name}
                className={`capitalize appearance-none w-full bg-stone-800 leading-5 text-xs text-white font-sans p-2 border-solid border-gray-500 border-[1px] rounded
                ${error ? 'border-red-500' : ''}`}
                ref={ref}
                {...rest}
            ></textarea>
            {error && <span className="text-red-500 text-xs italic">This field is required</span>}

        </div>
    )
})

export default Input;