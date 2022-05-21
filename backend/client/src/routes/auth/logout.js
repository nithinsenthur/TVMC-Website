import React from 'react'
import { useAuth } from '../../services/users.service'
import { Redirect } from 'react-router'

export default function LogOut() {
    const { logout } = useAuth()
    logout()
    return <Redirect to="/login" />
}
