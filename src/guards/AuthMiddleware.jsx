import React from 'react'
import { useCookies } from 'react-cookie'
import { LoadingLottie } from '../components'
import { useAuthStore } from '../hooks'
import { storeApi } from '../store/actions'

export const AuthMiddleware = ({ children }) => {
    const { uid } = useAuthStore()
    const [cookies] = useCookies(['logged_in'])

    const { isLoading } = storeApi.endpoints.getMe.useQuery(null, {
        skip: !cookies.logged_in,
    })

    if (isLoading && !uid) {
        return <LoadingLottie />
    }

    return children
}
