import React, { useContext, useState } from "react"
import jwt_decode from 'jwt-decode'
import config from '../config.json'

const AuthContext = React.createContext()

let { apiUrl } = config

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        const token = localStorage.getItem('token')
        return token && token
    })

    const getUsers = async (username = null) => {
        try {
            const token = localStorage.getItem('token')
            let query = `${apiUrl}/api/members/`
            if(username)
            {
                query += `?name=${username}`
            }
            return await fetch(query, {
                method: 'GET',
                headers: {
                    'auth-token': token
                }
            })
            .then(response => response.json())
        } catch(err) {
            console.log(err)
        }
    }

    const getUnverifiedUsers = async () => {
        const token = localStorage.getItem('token')
        let query = `${apiUrl}/api/members/unverified`
        return await fetch(query, {
            method: 'GET',
            headers: {
                'auth-token': token
            }
        })
        .then(response => response.json())
    }

    const login = async (user, cb) => {
        let response = await fetch(`${apiUrl}/api/members/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
                response_key: user.responseKey
            })
        })
        .then(data => data.json())

        if(response.error) {
            return cb(response.error)
        } else {
            setToken(response.token)
            localStorage.setItem('token', response.token)
        }
    }

    const verify = async (code) => {
        try {
            return await fetch(`${apiUrl}/api/members/verify`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({
                    PhoneNumberVerificationCode: code
                })
            }).then(response => response.json())
        }
        catch(err) {
            console.log(err)
        }
    }

    const forgotPassword = async (email) => {
        try {
            return await fetch(`${apiUrl}/api/members/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                })
            }).then(response => response.json())
        }
        catch(err) {
            console.log(err)
        }
    }

    const resetPassword = async (resetToken, password) => {
        try {
            return await fetch(`${apiUrl}/api/members/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'reset-token': resetToken
                },
                body: JSON.stringify({
                    password: password
                })
            }).then(response => response.json())
        }
        catch(err) {
            console.log(err)
        }
    }

    const deleteMember = async (id) => {
        await fetch(`${apiUrl}/api/members/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                _id: id
            })
        }).then(response => response.json())
    }

    const logout = () => {
        localStorage.clear('token')
        setToken(null)
    }

    const register = async (user) => {
        return await fetch(`${apiUrl}/api/members/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
    }

    const edit = async (id, update) => {
        return await fetch(`${apiUrl}/api/members/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                _id: id,
                update: update
                })
        }).then(response => response.json())
    }

    const isAdmin = () => {
        const token = localStorage.getItem('token')
        if (!token) return false
        const user = jwt_decode(token)
        if (user.permissions.admin) return true
        else return false
    }

    const isLoggedIn = () => {
        const token = localStorage.getItem('token')
        if (!token) return false
        const user = jwt_decode(token)
        if (user._id) return true
        else return false
    }

    const isVerified = () => {
        const token = localStorage.getItem('token')
        if (!token) return false
        const user = jwt_decode(token)
        if (user.verified) return true
        else return false
    }
    const getID = ()  => {
        const token = localStorage.getItem('token')
        const user = jwt_decode(token)
        return user._id
    }

    const getUsername = ()  => {
        const token = localStorage.getItem('token')
        const user = jwt_decode(token)
        return user.name
    }

    const value = {
        token,
        setToken,
        getUsers,
        getUnverifiedUsers,
        verify,
        deleteMember,
        login,
        logout,
        register,
        edit,
        isAdmin,
        isLoggedIn,
        isVerified,
        getID,
        getUsername,
        forgotPassword,
        resetPassword
    }

    return ( 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
