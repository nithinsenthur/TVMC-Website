import React, { useContext, useState } from "react"
import jwt_decode from 'jwt-decode'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        const token = localStorage.getItem('token')
        return token && token
    })

    const getUsers = async (username = null) => {
        const token = localStorage.getItem('token')
        let query = 'http://localhost:5000/api/members/'
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
    }

    const getUnverifiedUsers = async () => {
        const token = localStorage.getItem('token')
        let query = 'http://localhost:5000/api/members/unverified'
        return await fetch(query, {
            method: 'GET',
            headers: {
                'auth-token': token
            }
        })
        .then(response => response.json())
    }

    const login = async (user, errorCallback) => {
        let response = await fetch('http://localhost:5000/api/members/login', {
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
            return errorCallback(response.error)
        } else {
            setToken(response.token)
            localStorage.setItem('token', response.token)
        }
    }

    const verify = async (id) => {
        await fetch('http://localhost:5000/api/members/verify', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify({
                _id: id
            })
        }).then(response => response.json())
    }

    const deleteMember = async (id) => {
        await fetch('http://localhost:5000/api/members/delete', {
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

    const register = async (user, errorCallback, responseCallback) => {
        let response = await fetch('http://localhost:5000/api/members/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())

        if (response.error) {
            errorCallback(response.error)
        } else {
            errorCallback()
            responseCallback(response.status)
        }
    }

    const edit = async (id, update) => {
        return await fetch('http://localhost:5000/api/members/edit', {
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
        if (user.admin) return true
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
        getUsername
    }

    return ( 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
