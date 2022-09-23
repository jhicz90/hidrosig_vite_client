import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURL = import.meta.env.VITE_APP_API_URL

export const storeApi = createApi({
    reducerPath: 'storeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}`,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token

            if (token) {
                headers.set('Authorization', token)
            }

            return headers
        }
    }),
    endpoints: (builder) => ({
        getUsrSysForOccup: builder.query({
            query: ({ id, search }) => `occupation/list_usersys_in/${id}/${search}`,
            transformResponse: (response, meta, arg) => response.docs,
            // query: ({ id, search }) => ({ url: `list_usersys_in`, body: { id, search } })
        }),
    }),
})

export const { useGetUsrSysForOccupQuery } = storeApi