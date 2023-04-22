import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { MD5 } from 'crypto-js'

const secretAccess = import.meta.env.VITE_APP_SECRET_ACCESS

export const GuardRoute = ({ meta = [], children }) => {

    const { modules } = useSelector(state => state.auth)
    const access = modules.filter(m => meta.find(me => m.key === MD5(me).toString()))

    if (modules.find(m => m.key === MD5(secretAccess).toString())) {
        return children
    }

    if (access.find(acc => acc.view === true)?.view) {
        return children
    }

    return <Navigate to={-1} replace />
}