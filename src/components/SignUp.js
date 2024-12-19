import {useState, useEffect} from "react";
import {ImFacebook2} from "react-icons/im";
import Input from "./Input";
import {useForm} from "react-hook-form"
import Notification from "./Notification";
import {postData} from "./fetchMessage";
import Button from "./Button";
import {useNavigate} from "react-router-dom";

export default function SignUp() {
    const [data, setData] = useState([])
    const [newUser, setNewUser] = useState([])
    const [showNotify, setShowNotify] = useState(false)
    const [status, setStatus] = useState(null)
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        }
    } = useForm()

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then((response) => response.json())
            .then((postUser) => {
                setData(postUser)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const triggerNotification = () => {
        setShowNotify(true)
        setTimeout(() => setShowNotify(false), 3000)
    }

    const onSubmit = async data => {
        try {
            const response = await postData(data)
            localStorage.setItem("username",data.username);
            localStorage.setItem("loggedIn","true");
            nav('/Welcome');
        } catch (error) {
            reset()
            triggerNotification()
            setStatus({
                status: 'error',
                message: error.message,
            })
            console.log('Error occurred while posting context:', error)
        }
    }

    const nav = useNavigate();
    const handleClick = () => {
        nav(`/Login`);
    };

    return (
        <div className="flex flex-col justify-center items-center bg-black w-full">
            <div
                className="flex flex-col justify-center items-center gap-4 bg-black border-[1px] border-[rgb(54,54,54)] rounded-[1px] w-[23%] h-4/5 pl-11 pr-11 pt-10 pb-8 mb-[10px]">
                <img src="/img/logo/Instagram-Wordmark-White-Logo.wine.svg" alt=""/>
                <p className="font-sans font-medium text-base opacity-70 text-white text-center">Sign up to see photos
                    and videos from your friends.</p>
                <button className="bg-[#0095F6] flex justify-center items-center gap-2 w-full pt-2 pb-2 rounded-lg">
                    <ImFacebook2 color={"white"} size={20}/>
                    <p className="font-sans font-medium text-sm text-white self-center">Log in with Facebook</p>
                </button>
                <div className="flex w-full justify-center items-center gap-2 ">
                    <div className="w-full h-0.5 bg-white bg-opacity-30"></div>
                    <p className="font-sans font-medium text-sm text-white opacity-60">OR</p>
                    <div className="w-full h-0.5 bg-white bg-opacity-30"></div>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 w-full">
                    <form onSubmit={handleSubmit(onSubmit)}
                          className="flex flex-col justify-center items-center gap-2 w-full">
                        <Input
                            type={"text"}
                            placeholder={'Mobile Number or Email'}
                            name={'number_email'}
                            {...register('number_email',
                                {required: 'number_email is required'})}
                            error={errors.number_email?.message}
                        />
                        <Input
                            type={"password"}
                            placeholder="Password"
                            name={'password'}
                            {...register('password',
                                {required: 'password is required'})}
                            error={errors.password?.message}
                        />
                        <Input
                            type={"text"}
                            placeholder="Full Name"
                            name={'full_name'}
                            {...register('full_name',
                                {required: 'full_name is required'})}
                            error={errors.full_name?.message}
                        />
                        <Input
                            type={"text"}
                            placeholder="Username"
                            name={"username"}
                            {...register('username',
                                {required: 'username is required'})}
                            error={errors.username?.message}
                        />
                        <Button type='submit' text={"Sign Up"}/>
                    </form>
                    {showNotify && (
                        <Notification status={status.status} message={status.message}/>
                    )}
                    <p className="font-sans font-normal text-xs opacity-60 text-white text-center">People who use our
                        service may have uploaded your contact information to Instagram. Learn More</p>
                    <p className="font-sans font-normal text-xs opacity-60 text-white text-center">By signing up, you
                        agree to our Terms , Privacy Policy and Cookies Policy.</p>
                </div>
            </div>
            <div
                className="bg-black border-[1px] border-[rgb(54,54,54)] rounded-[1px] w-[23%] flex justify-center items-center mb-[10px] pt-[10px] pb-[10px]">
                <div className="flex justify-center items-center gap-1 m-[15px]">
                    <p className="font-sans text-white text-sm">Have an account?</p>
                    <a className="font-sams text-[#0095F6] cursor-pointer" onClick={handleClick}>Log in</a>
                </div>
            </div>

        </div>
    )
}