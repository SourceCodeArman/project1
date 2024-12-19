import React from "react";
import ProfileCard from "./ProfileCard";
import {useLocation} from "react-router-dom";
import Header from "./Header";

export default function AdminProfile() {
    const location = useLocation();
    const user = location.state; // Retrieve the passed user data
    console.log(user)
    if (!user) {
        return <div className="font-sans font-semibold text-3xl text-white">User Not Found</div>;
    }

    return (
        <div className="flex flex-col justify-start items-center p-7 gap-12 w-full h-dvh">
            {user ? <Header page={"Admin"} user={user} username={user.username} />:""}
            <div
                className="flex justify-center items-start w-4/5 h-3/5 bg-[#686A6C] rounded-2xl shadow-[0px_0px_18px_2px_#686A6C] p-10 gap-4">
                <ProfileCard dropdown={false} currentUser={user} username={user.username} admin={true}/>
                <div className="flex justify-start items-center w-full gap-4">
                    <div className="flex flex-col justify-center items-start text-white">
                        <h5 className="font-sans text-2xl">ID: <span
                            className="font-semibold">{user.id}</span></h5>
                        <p className="font-sans text-2xl">Username: <span
                            className="font-semibold">{user.username}</span></p>
                    
                    </div>
                    <div className="flex flex-col justify-center items-start text-white">
                        <h5 className="font-sans text-2xl">Phone Number: <span
                            className="font-semibold">{/[a-zA-Z]/g.test(user.number_email) ? "N/A" : user.number_email}</span>
                        </h5>
                        <p className="font-sans text-2xl">Email: <span
                            className="font-semibold">{/[a-zA-Z]/g.test(user.number_email) ? user.number_email : "N/A"}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}