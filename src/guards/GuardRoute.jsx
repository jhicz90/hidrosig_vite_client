import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { MD5 } from 'crypto-js'

const secretAccess = import.meta.env.VITE_APP_SECRET_ACCESS

export const GuardRoute = ({ meta = [], component: RouteComponent }) => {

    const { modAccess: modules } = useSelector(state => state.auth)
    const access = meta.filter(m => modules.find(acc => acc === m))

    if (modules.find(m => m === MD5(secretAccess).toString())) {
        return <RouteComponent />
    }

    if (access.length === meta.length) {
        return <RouteComponent />
    }

    return <Navigate to={-1} replace />
}
