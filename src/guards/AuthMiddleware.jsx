import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'
import { LoadingLottie } from '../components'
import { storeApi } from '../store/actions'

export const AuthMiddleware = ({ children }) => {
    const [cookies] = useCookies(['logged_in'])

    const { isLoading } = storeApi.endpoints.getMe.useQuery(null, {
        skip: !cookies.logged_in,
    })

    if (isLoading) {
        return <LoadingLottie />
    }

    return children
}
