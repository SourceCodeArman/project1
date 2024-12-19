import {useState, useEffect} from "react";
import { FaFacebook } from "react-icons/fa";
import Input from "./Input";
import {useForm} from "react-hook-form"
import Notification from "./Notification";
import Button from "./Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Login(){

    const [users,setUsers] = useState([])
    const [admins, setAdmins] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
    const [showNotify, setShowNotify] = useState(false)
    const [status, setStatus] = useState(null)

    const {
        handleSubmit,
        register,
        reset,
        formState: {
            errors
        }
    } = useForm()

    const nav = useNavigate();
    const handleClick = () => {
        nav(`/`);
    };

    const triggerNotification = () => {
        setShowNotify(true)
        setTimeout(() => setShowNotify(false), 3000)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users");  // Axios GET request
                setUsers(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();

        const fetchAdmins = async () => {
            try {
                const response = await axios.get("http://localhost:3000/admins");  // Axios GET request
                setAdmins(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAdmins();
    }, []);

    if (loading){
        return <div>
            loading
        </div>
    }
    if (error){
        return <div>
            Error
        </div>
    }

    const onSubmit = async userData => {
        let match;
        let data;
        for(let i=0; i<users.length; i++){
            if((users[i].username === userData.number_email_username || users[i].number_email === userData.number_email_username) && users[i].password === userData.password){
                match = true;
                data = [users[i], "user"];
                break
            } else {
                for(let i=0; i<admins.length; i++){
                    if((admins[i].username === userData.number_email_username || admins[i].number_email === userData.number_email_username) && admins[i].password === userData.password){
                        match = true;
                        data = [admins[i], "admin"];
                        console.log(data)
                        break
                    } else {
                        match = false;
                    }
                }
            }
        }
        if(match === true){
            console.log('match');
            localStorage.setItem("username",data[0].username);
            if(data[1] === "user"){
                localStorage.setItem("loggedIn","true");
                localStorage.setItem("adminLoggedIn","false");
                nav("/Welcome", { state: data[0] });
            } else if (data[1] === "admin"){
                localStorage.setItem("adminLoggedIn","true");
                localStorage.setItem("loggedIn","false");
                nav("/Admin", { state: data[0] });
            }
        } else {
            reset();
            triggerNotification()
            setStatus({
                status: 'error',
                message: 'Wrong Number, Email, Username or Password',
            })
        }
    }

    return(
        <div className="flex flex-col justify-center items-center bg-black w-full">
            <div
                className="flex flex-col justify-center items-center gap-4 bg-black border-[1px] border-[rgb(54,54,54)] rounded-[1px] w-[23%] h-4/5 pl-11 pr-11 pt-10 pb-8 mb-[10px]">
                <img src="/img/logo/Instagram-Wordmark-White-Logo.wine.svg" alt=""/>
                <div className="w-full flex flex-col">
                    <form onSubmit={handleSubmit(onSubmit)}
                          className="flex flex-col justify-center items-center gap-2 w-full">
                        <Input
                            placeholder="Phone number, username, or email"
                            type="text"
                            name="number_email_username"
                            {...register('number_email_username',
                                {required: 'number_email_username is required'})}
                            error={errors.number_email_username?.message}
                        />
                        <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            {...register('password',
                                {required: 'password is required'})}
                            error={errors.password?.message}
                        />
                        <Button type='submit' text={"Log in"}/>
                    </form>
                    {showNotify && (
                        <Notification status={status.status} message={status.message}/>
                    )}
                </div>
                <div className="flex w-full justify-center items-center gap-2 ">
                    <div className="w-full h-0.5 bg-white bg-opacity-30"></div>
                    <p className="font-sans font-medium text-sm text-white opacity-60">OR</p>
                    <div className="w-full h-0.5 bg-white bg-opacity-30"></div>
                </div>
                <button className="bg-black flex justify-center items-center gap-2 w-full pt-2 pb-2 rounded-lg">
                    <FaFacebook color={"#0095F6"} size={20}/>
                    <p className="font-sans font-medium text-sm text-[#0095F6] self-center">Log in with Facebook</p>
                </button>
                <button className="bg-none border-none text-white text-sm font-sans">Forgot password?</button>
            </div>
            <div
                className="bg-black border-[1px] border-[rgb(54,54,54)] rounded-[1px] w-[23%] flex justify-center items-center mb-[10px] pt-[10px] pb-[10px]">
                <div className="flex justify-center items-center gap-1 m-[15px]">
                    <p className="font-sans text-white text-sm">Don't have an account?</p>
                    <a className="font-sams text-[#0095F6] cursor-pointer" onClick={handleClick}>Sign up</a>
                </div>
            </div>
        </div>
    )
}