import { useLocation, useNavigate } from 'react-router-dom'

export const useNavigateState = (url = '') => {

    const location = useLocation()
    const navigate = useNavigate()
    const { state } = location
    
    const redirect = () => {
        navigate(state.from || url, { state: state?.from?.state || null })
    }

    const redirectEscape = () => {
        navigate(`/app/err404`, { state: { from: location || null } })
    }

    return [state, redirect, redirectEscape]
}
