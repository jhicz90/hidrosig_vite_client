import { useDispatch, useSelector } from 'react-redux'
import { onSetToken } from '../store/auth'

export const useAuthStore = () => {

    const dispatch = useDispatch()
    const { uid } = useSelector(state => state.auth)

    const setToken = (token) => {
        dispatch(onSetToken(token))
    }

    return {
        //* PROPIEDADES
        uid,
        //* METODOS
        setToken
    }
}
