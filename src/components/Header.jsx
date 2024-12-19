import React from 'react';
import ProfileCard from "./ProfileCard";

export default function Header({page, user, username}) {

    return (
        <div className="flex w-full justify-center items-center bg-[#686A6C] p-2 rounded-xl">
            <img src="/img/logo/Instagram-Wordmark-White-Logo.wine.svg" alt=""/>
            <div className="h-full flex items-center justify-center w-full">
                <h1 className="font-sans font-semibold text-2xl text-white">{page}</h1>
            </div>
            <div className="ml-[150px]">
                {user ? <ProfileCard currentUser={user} dropdown={true} admin={true}
                                             username={username}/> : ""}
            </div>
        </div>
    )
}