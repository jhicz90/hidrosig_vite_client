import axios from 'axios'
import { msgFetchAlert } from './ManagerMsg'

const baseURL = import.meta.env.VITE_APP_API_URL

export const fetchNoToken = async ({ endpoint = '', params = {}, data = {}, method = 'GET', alert = true }) => {
    try {
        if (method === 'GET') {
            const resp = await axios({
                method,
                baseURL,
                headers: {
                    'Content-type': 'application/json'
                },
                url: endpoint,
                params
            })

            const bodyResponse = JSON.parse(JSON.stringify(resp.data, (key, value) =>
                typeof value === 'bigint'
                    ? value.toString()
                    : value
            ))

            if (bodyResponse.msg !== undefined && alert) {
                msgFetchAlert(bodyResponse)
            }

            return bodyResponse
        } else {
            const resp = await axios({
                method,
                baseURL,
                headers: {
                    'Content-type': 'application/json'
                },
                url: endpoint,
                data
            })

            const bodyResponse = JSON.parse(JSON.stringify(resp.data, (key, value) =>
                typeof value === 'bigint'
                    ? value.toString()
                    : value
            ))

            if (bodyResponse.msg !== undefined && alert) {
                msgFetchAlert(bodyResponse)
            }

            return bodyResponse
        }
    } catch (err) {
        console.log(err)
        const errorFetch = { ok: false, msg: err.hasOwnProperty('response') ? err.response.data.msg : [{ content: err.message, delay: 5000, type: 'error' }] }
        msgFetchAlert(errorFetch)
        return errorFetch
    }
}

export const fetchByToken = async ({ endpoint = '', params = {}, data = {}, method = 'GET', alert = true }) => {

    const token = localStorage.getItem('token') || ''

    try {
        if (token !== '') {
            if (method === 'GET') {
                const resp = await axios({
                    method,
                    baseURL,
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': token
                    },
                    url: endpoint,
                    params
                })

                const bodyResponse = JSON.parse(JSON.stringify(resp.data, (key, value) =>
                    typeof value === 'bigint'
                        ? value.toString()
                        : value
                ))

                if (bodyResponse.msg !== undefined && alert) {
                    msgFetchAlert(bodyResponse)
                }

                return bodyResponse
            } else {
                const resp = await axios({
                    method,
                    baseURL,
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': token
                    },
                    url: endpoint,
                    data
                })

                const bodyResponse = JSON.parse(JSON.stringify(resp.data, (key, value) =>
                    typeof value === 'bigint'
                        ? value.toString()
                        : value
                ))

                if (bodyResponse.msg !== undefined && alert) {
                    msgFetchAlert(bodyResponse)
                }

                return bodyResponse
            }
        } else {
            return { ok: false }
        }
    } catch (err) {
        console.log(err)
        const errorFetch = { ok: false, msg: err.hasOwnProperty('response') ? err.response.data.msg : [{ content: err.message, delay: 5000, type: 'error' }] }
        msgFetchAlert(errorFetch)
        return errorFetch
    }
}

export const fetchUpFilesByToken = async ({ endpoint = '', data = {}, method = 'POST', alert = true }) => {

    const token = localStorage.getItem('token') || ''

    try {
        const resp = await axios({
            method,
            baseURL,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            },
            url: endpoint,
            data
        })

        const bodyResponse = resp.data

        if (bodyResponse.msg !== undefined && alert) {
            msgFetchAlert(bodyResponse)
        }

        return bodyResponse
    } catch (err) {
        console.log(err)
        const errorFetch = { ok: false, msg: err.hasOwnProperty('response') ? err.response.data.msg : [{ content: err.message, delay: 5000, type: 'error' }] }
        msgFetchAlert(errorFetch)
        return errorFetch
    }
}