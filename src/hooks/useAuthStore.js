import { useDispatch, useSelector } from 'react-redux'
import { onSetCheckLogin, onSetToken } from '../store/auth'

export const useAuthStore = () => {

    const dispatch = useDispatch()
    const { uid, checkLogin, token } = useSelector(state => state.auth)

    const setToken = (token) => {
        dispatch(onSetToken(token))
    }

    const setCheckLogin = (log) => {
        dispatch(onSetCheckLogin(log))
    }

    return {
        //* PROPIEDADES
        uid,
        checkLogin,
        token,
        //* METODOS
        setToken,
        setCheckLogin,
    }
}
