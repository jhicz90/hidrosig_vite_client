import { fetchByToken } from '../../helpers'

export const searchCommitteeByJunta = async (junta, search) => {
    if (junta === '') {
        return []
    } else {
        const resp = await fetchByToken({
            endpoint: 'committee/searchbyjunta',
            params: { junta, search },
            alert: false
        })

        if (resp.ok) {
            return resp.docs
        } else {
            return []
        }
    }
}