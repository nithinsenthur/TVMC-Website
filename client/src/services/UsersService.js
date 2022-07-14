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
        let query = `${process.env.REACT_APP_SITE_URL}/api/members/`
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
        let query = `${process.env.REACT_APP_SITE_URL}/api/members/unverified`
        return await fetch(query, {
            method: 'GET',
            headers: {
                'auth-token': token
            }
        })
        .then(response => response.json())
    }

    const login = async (user, cb) => {
        let response = await fetch(`${process.env.REACT_APP_SITE_URL}/api/members/login`, {
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
        // also set user token to verified
        return await fetch(`${process.env.REACT_APP_SITE_URL}/api/members/verify`, {
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
    const deleteMember = async (id) => {
        await fetch(`${process.env.REACT_APP_SITE_URL}/api/members/delete`, {
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
        return await fetch(`${process.env.REACT_APP_SITE_URL}/api/members/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
    }

    const edit = async (id, update) => {
        return await fetch(`${process.env.REACT_APP_SITE_URL}/api/members/edit`, {
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
        console.log(user.permissions)
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
        getUsername
    }

    return ( 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
