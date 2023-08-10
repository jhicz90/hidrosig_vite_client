import React, { useEffect } from 'react'
import { LoadingLottie } from '../components'
import { useAuthStore } from '../hooks'
import { useGetMeQuery } from '../store/actions'

export const AuthMiddleware = ({ children }) => {

    const { checkLogin, setCheckLogin } = useAuthStore()
    const { isLoading } = useGetMeQuery()

    useEffect(() => {
        onstorage = () => {
            if (!localStorage.getItem('token')) {
                setCheckLogin(true)
            }
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
