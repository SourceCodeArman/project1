import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ProfileCard({dropdown, index, admin, currentUser, username, width, height}) {

    const nav = useNavigate();
    const userInitial = username.charAt(0).toUpperCase();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Default sizes if not provided
    const defaultSize = "pt-2 pb-2 pl-4 pr-4";
    const customSize = width && height ? `w-[${width}px] h-[${height}px] flex justify-center items-center` : defaultSize;
    
    const handleMouseEnter = () => {
        dropdown ? setIsDropdownOpen(true) : setIsDropdownOpen(false);
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            setIsDropdownOpen(false);
        }, 150);
    };

    const logOut = () => {
        localStorage.clear();
        localStorage.setItem("loggedIn", "false");
        nav("/Login");
    }

    const openAdminProfile = (username) => {
        nav("/AdminProfile", { state: currentUser });
    }
    
    const openProfile = (index) => {
        nav("/Profile", { state: currentUser });
    }

    // Adjust text size based on container size
    const getTextSize = () => {
        if (width && height) {
            const size = Math.min(parseInt(width), parseInt(height));
            if (size >= 32) return 'text-4xl';
            if (size >= 24) return 'text-3xl';
            if (size >= 16) return 'text-2xl';
            return 'text-xl';
        }
        return 'text-2xl'; // default size
    }

    return (
        <div 
            className={`flex justify-center items-center rounded-[100%] bg-[#E6E6E6] relative ${customSize}`}
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <p className={`font-sans font-semibold ${getTextSize()} flex justify-center items-center`}>
                {userInitial}
            </p>
            {isDropdownOpen && (
                <div className="absolute top-11 right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg">
                    <ul className="py-2">
                        <p className="font-sans font-semibold px-4 py-2 cursor-default">{username}</p>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" 
                            onClick={admin ? openAdminProfile : (username) => openProfile(index)}>
                            Profile
                        </li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logOut}>
                            Log Out
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}