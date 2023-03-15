import { fetchByToken } from '../../helpers'
import { storeApi } from '../storeApi'

export const locationApi = storeApi.injectEndpoints({
    endpoints: (builder) => ({
        // LOCATION
        getListLocation: builder.query({
            query: (search) => ({
                url: `location/list`,
                params: {
                    search
                }
            }),
            transformResponse: (response, meta, arg) => response.docs,
        }),
        // LOCATION
    })
})

export const {
    useGetListLocationQuery,
} = locationApi

export const searchLocation = async (search) => {
    const resp = await fetchByToken({
        endpoint: `location/search`,
        params: { search }
    })

    if (resp.ok) {
        return resp.docs
    } else {
        return []
    }
}