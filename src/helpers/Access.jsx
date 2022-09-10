import { useSelector } from 'react-redux'

export const GuardAccess = (passCode) => {
    const { access, pages } = useSelector(state => state.auth)

    if (access !== 'A') {
        for (let index = 0; index < pages.length; index++) {
            if (pages[index].code === passCode) return true
        }
        return false
    } else {
        return true
    }
}