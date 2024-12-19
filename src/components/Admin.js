import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import { DataContext } from "./DataProvider";
import { Search, Bell, Settings, AlertTriangle } from 'lucide-react';
import FormatPhoneNumber from './formatPhoneNumber.js';

export default function Admin() {
    const { users, admins, deactivateUser, reactivateUser, deleteUser } = useContext(DataContext);
    const nav = useNavigate();
    const location = useLocation();
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const user = location.state;

    useEffect(() => {
        if (admins && user?.username) {
            const foundAdmin = admins.find(admin => admin.username === user.username);
            if (foundAdmin) setCurrentAdmin(foundAdmin);
        }
    }, [admins, user]);

    useEffect(() => {
        if (!localStorage.getItem("adminLoggedIn")) {
            nav("/Login");
        }
    }, [localStorage]);

    function openUserProfile(index) {
        const selectedUser = users[index];
        nav("/Profile", { state: selectedUser });
    }

    users.map((user)=>{
        console.log(user.deactivated, user.username);
    })

    async function DeactivateAccount(index) {
        const userToDeactivate = users[index];
        try {
            await deactivateUser(userToDeactivate.id);
        } catch (error) {
            console.error('Error in DeactivateAccount:', error);
        }
    }

    async function ReactivateAccount(index) {
        const userToReactivate = users[index];
        try {
            await reactivateUser(userToReactivate.id);
        } catch (error) {
            console.error('Error in ReactivateAccount:', error);
        }
    }

    async function DeleteAccount(index) {
        const userToDelete = users[index];
        try {
            await deleteUser(userToDelete.id);
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error in DeleteAccount:', error);
        }
    }

    if (!localStorage.getItem("adminLoggedIn")) return null;

    return (
        <div className="bg-gray-100 min-h-screen w-full">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-gray-900 mr-8">Admin Dashboard</h1>
                        <nav>
                            <ul className="flex space-x-4">
                                <li><a href="#" className="text-gray-600 hover:text-gray-900">Users</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-gray-900">Analytics</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-gray-900">Reports</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Search..." className="pl-8 pr-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button className="p-1 rounded-full hover:bg-gray-200">
                            <Bell className="h-5 w-5 text-gray-600" />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-200">
                            <Settings className="h-5 w-5 text-gray-600" />
                        </button>
                        <div className="flex items-center space-x-2">
                            <ProfileCard dropdown={true} username={user?.username} currentUser={user} admin={true} />
                            <span className="text-sm font-medium text-gray-700">{currentAdmin?.username}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto py-10 px-4">
                <h2 className="text-3xl font-bold mb-6">User Profiles</h2>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users?.map(({ username, full_name, number_email, deactivated }, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <ProfileCard dropdown={false} username={username} index={index} admin={false} />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{full_name}</div>
                                                <div className="text-sm text-gray-500">{username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {number_email ? (/[a-zA-Z]/g.test(number_email) ? number_email : FormatPhoneNumber(number_email)) : "N/A"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${deactivated ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {deactivated ? 'Inactive' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button 
                                            onClick={() => deactivated ? ReactivateAccount(index) : DeactivateAccount(index)}
                                            className={`${deactivated ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'} text-white font-bold py-1 px-2 rounded mr-2`}
                                        >
                                            {deactivated ? 'Reactivate' : 'Deactivate'}
                                        </button>
                                        <button 
                                            onClick={() => {
                                                setUserToDelete(index);
                                                setShowDeleteModal(true);
                                            }}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Delete
                                        </button>
                                        <button 
                                            onClick={() => openUserProfile(index)}
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Open Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto min-h-screen w-full flex justify-center items-center">
                    <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <AlertTriangle className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Delete User
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this user? This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        DeleteAccount(userToDelete);
                                        setShowDeleteModal(false);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}