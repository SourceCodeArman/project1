import React, {createContext, useEffect, useReducer} from 'react';
import axios from "axios";



export const DataContext = createContext();

const initialState = {
     users:[],
     admins:[],
     loading: false,
     error: null,
}


const dataReducer = (state, action) => {
    switch (action.type){
        case 'SET_USERS':
            return {...state, users: action.payload}
        case 'SET_ADMINS':
            return {...state, admins: action.payload}
        case 'SET_LOADING':
            return {...state, loading: action.payload}
        case 'SET_ERROR':
            return {...state, error: action.payload}
        case 'DEACTIVATE_USER':
            return {...state, users: state.users.map(user => 
                user.id === action.payload ? { ...user, deactivated: true } : user
            )}
        case 'REACTIVATE_USER':
            return {...state, users: state.users.map(user => 
                user.id === action.payload ? { ...user, deactivated: false } : user
            )}
        case 'DELETE_USER':
            return {
                ...state, 
                users: state.users.filter(user => user.id !== action.payload)
            }
        default:
            return state;
    }
}

export const DataProvider = ({children}) => {

    const [state, dispatch] = useReducer(dataReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type:"SET_LOADING",payload:true})
            try{
                const [
                    usersResponse,
                    adminsResponse
                ] = await Promise.all([
                    axios.get("http://localhost:3000/users"),
                    axios.get("http://localhost:3000/admins")
                ]);
                const usersData = usersResponse.data;
                const adminsData = adminsResponse.data;

                dispatch({type: 'SET_USERS', payload:usersData})
                dispatch({type: 'SET_ADMINS', payload:adminsData})
            } catch(err){
                dispatch({type: 'SET_ERROR', payload:err.message})
            } finally {
                dispatch({type: 'SET_LOADING', payload:false})
            }
        };
        fetchData()
    }, []);

    async function deactivateUser(userId) {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deactivated: true
                })
            });

            if (!response.ok) {
                throw new Error('Failed to deactivate account');
            }

            dispatch({
                type: 'DEACTIVATE_USER',
                payload: userId
            });
        } catch (error) {
            console.error('Error deactivating account:', error);
            throw error;
        }
    }

    async function reactivateUser(userId) {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deactivated: false
                })
            });

            if (!response.ok) {
                throw new Error('Failed to reactivate account');
            }

            dispatch({
                type: 'REACTIVATE_USER',
                payload: userId
            });
        } catch (error) {
            console.error('Error reactivating account:', error);
            throw error;
        }
    }

    async function deleteUser(userId) {
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete account');
            }

            dispatch({
                type: 'DELETE_USER',
                payload: userId
            });
        } catch (error) {
            console.error('Error deleting account:', error);
            throw error;
        }
    }

    if (state.loading){
        return <div>Loading...</div>;
    }

    if (state.error){
        return <div></div>
    }

    return (
        <DataContext.Provider value={{
            users: state.users,
            admins: state.admins,
            deactivateUser,
            reactivateUser,
            deleteUser
        }}>
            {children}
        </DataContext.Provider>
    )
}