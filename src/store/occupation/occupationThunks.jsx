import { fetchByToken } from '../../helpers'

export const registerOccupation = async (name) => {
    const resp = await fetchByToken({
        endpoint: 'occupation/create/new',
        data: { name },
        method: 'POST'
    })

    if (resp.ok) {
        return resp.category
    } else {
        return null
    }
}

export const searchOccupation = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'occupation/list',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}