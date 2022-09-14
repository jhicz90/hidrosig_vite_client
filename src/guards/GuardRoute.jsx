import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const secretAccess = import.meta.env.VITE_APP_SECRET_ACCESS

export const GuardRoute = ({ meta = [], component: RouteComponent }) => {

    const { modAccess } = useSelector(state => state.auth)
    const access = meta.filter(m => modAccess.find(acc => acc === m))

    if (modAccess[0] === secretAccess) {
        return <RouteComponent />
    }

    if (access.length === meta.length) {
        return <RouteComponent />
    }

    return <Navigate to={-1} replace />
}
