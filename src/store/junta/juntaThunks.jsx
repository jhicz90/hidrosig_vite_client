import { fetchByToken } from '../../helpers'

export const searchJunta = async (search) => {
    const resp = await fetchByToken({
        endpoint: 'junta/search',
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}