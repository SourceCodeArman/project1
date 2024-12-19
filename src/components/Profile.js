import React from "react";
import ProfileCard from "./ProfileCard";
import {useLocation} from "react-router-dom";
import Header from "./Header";
import { LogIn, FileEdit, LogOut } from 'lucide-react';
import FormatPhoneNumber from './formatPhoneNumber.js';

export default function Profile(){
    const location = useLocation();
    const user = location.state;

    if (!user) {
        return <div className="font-sans font-semibold text-3xl text-white">User Not Found</div>;
    }

    // Function to determine if input is email or phone
    const isEmail = (input) => /[a-zA-Z]/g.test(input);
    
    // Format the contact information
    const getFormattedContact = (contact) => {
        if (isEmail(contact)) {
            return contact; // Return email as is
        }
        return FormatPhoneNumber(contact); // Format phone number
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full">
            <main className="container mx-auto py-10 px-4">
                <div className="flex md:flex-row gap-6">
                    {/* Sidebar */}
                    <aside className=" md:w-1/4">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-6 text-center flex flex-col items-center justify-center">
                                <ProfileCard dropdown={false} currentUser={user} username={user.username} admin={true} width={"150"} height={"150"}/>
                                <h2 className="text-2xl font-bold text-gray-900 mt-4">{user.full_name}</h2>
                                <p className="text-gray-600">{user.username}</p>
                            </div>
                            <nav className="p-4">
                                <ul className="space-y-2 flex flex-col items-center justify-center">
                                    <li><a href="#personal-info" className="block px-4 py-2 rounded-md hover:bg-gray-100">Personal Information</a></li>
                                    <li><a href="#account-details" className="block px-4 py-2 rounded-md hover:bg-gray-100">Account Details</a></li>
                                    <li><a href="#activity-history" className="block px-4 py-2 rounded-md hover:bg-gray-100">Activity History</a></li>
                                </ul>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className=" md:w-3/4">
                        <h2 className="text-3xl font-bold mb-6">User Profile</h2>
                        
                        {/* Personal Information */}
                        <section id="personal-info" className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input type="text" value={user.full_name} readOnly 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="email" value={/[a-zA-Z]/g.test(user.number_email) ? user.number_email : "N/A"} readOnly 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                                        <input 
                                            type="tel" 
                                            value={!isEmail(user.number_email) ? getFormattedContact(user.number_email) : "N/A"} 
                                            readOnly 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Account Details */}
                        <section id="account-details" className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Account Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Username</label>
                                        <input type="text" value={user.username} readOnly 
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Account Status</label>
                                        <p className={`${user.deactivated ? 'text-red-800' : 'text-green-800'}`}>{user.deactivated ? "Inactive" : "Active"}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Activity History */}
                        <section id="activity-history" className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Activity History</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center space-x-3">
                                        <LogIn className="h-5 w-5 text-green-500" />
                                        <span>Last login - Recently</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <FileEdit className="h-5 w-5 text-blue-500" />
                                        <span>Profile updated - Recently</span>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <LogOut className="h-5 w-5 text-red-500" />
                                        <span>Last logout - Recently</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}