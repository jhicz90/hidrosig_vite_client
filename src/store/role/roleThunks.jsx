import { fetchByToken } from '../../helpers'

export const searchRole = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'role/list',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}