import { fetchByToken } from '../../helpers'

export const searchPermission = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'permission/list',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}