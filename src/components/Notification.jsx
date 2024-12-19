import React,{useState,useEffect} from 'react';

const Notification = ({
    status ='error',
            message='hello'}) => {
    const [showNotification, setShowNotification] = useState(false);
    useEffect(()=>{
            setShowNotification(true)
        const timer =setTimeout(()=>{
            setShowNotification(false)
        }, 5000)

        return ()=>clearTimeout(timer)
    },[])

    return (
        <div
            className={`fixed top-0 right-0 z-50 m-4 p-4 ${
                status === 'error'? 'bg-red-500': 'bg-green-500'
            } ${
                showNotification?'opacity-100 transition-opacity duration-300':'opacity-0'
            }`}>
            <p className={'text-white'}>{message}</p>
        </div>
    )
}


export default Notification;