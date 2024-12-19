import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import ProfileCard from "./ProfileCard";

export default function Welcome() {

    const nav = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("loggedIn") !== "true") {
            nav("/Login");
        }
    }, [localStorage]);

    if (localStorage.getItem("loggedIn") === "true") {
        return (
            <div className="flex flex-col w-full h-[100vh] justify-start items-center gap-12 p-7">
                <div className="flex w-full justify-between items-center bg-[#686A6C] p-2 rounded-xl">
                    <img src="/img/logo/Instagram-Wordmark-White-Logo.wine.svg" alt="" />
                    <ProfileCard dropdown={true} username={localStorage.getItem("username")} admin={false} />
                </div>
            </div>
        )
    }
}