import axios from 'axios';

const api = 'http://localhost:3000/users';

export async function postData(data) {
    try {

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.number_email)
        const isNumber = /^\+?\d+$/.test(data.number_email)
        const isPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(data.password)
        const isUsername = /^(?=.*[A-Za-z])[A-Za-z]{3,20}$/.test(data.username)
        const isFullName = /^(?=.*[A-Za-z])[A-Za-z]+\s(.*[A-Za-z])[A-Za-z]+$/.test(data.full_name)


        if (!isEmail && !isNumber) {
            throw new Error('Invalid must be a valid email or number')
        }
        if (!isPassword) {
            throw new Error('Invalid must be a valid password')
        }
        if (!isUsername) {
            throw new Error('Invalid must be a valid username')
        }
        if (!isFullName){
            throw new Error('Invalid must be a valid full name')
        }
        console.log('Data being sent to the API:', data);
        const response = await fetch(api, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to send data');
        }
        console.log('Response from the API:', response.json)
        return await response.json
    } catch (error) {
        if (error.response) {
            console.log('Server responded with error status:', error.response)
            console.log('Error response context:', error.response.data)
        } else if (error.request) {
            console.log('No response received from server.')
        } else {
            console.log('Error', error.message)
        }
        throw error;
    }
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null
}