import React, { useEffect } from 'react'
import { LoadingLottie } from '../components'
import { useAuthStore } from '../hooks'
import { useGetMeQuery, useLazyAuthRefreshQuery } from '../store/actions'

export const AuthMiddleware = ({ children }) => {

    const { checkLogin } = useAuthStore()
    const { isLoading } = useGetMeQuery()
    const [refresh] = useLazyAuthRefreshQuery()

    useEffect(() => {
        onstorage = () => {
            refresh()
        }
    }, [])

    if (isLoading || checkLogin) {
        return <LoadingLottie />
    }

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}
