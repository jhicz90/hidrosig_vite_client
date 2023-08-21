import { useDispatch, useSelector } from 'react-redux'
import { onSetCheckLogin, onSetToken } from '../store/auth'

export const useAuthStore = () => {

    const dispatch = useDispatch()
    const { uid, checkLogin, token, lvlAccess } = useSelector(state => state.auth)

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
        lvlAccess,
        //* METODOS
        setToken,
        setCheckLogin,
    }
}
