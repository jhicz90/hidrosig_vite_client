import axios from 'axios'
import { toast } from 'react-hot-toast'
import { ProgressBar } from 'react-bootstrap'
import { msgFetchAlert } from './ManagerMsg'

const baseURL = import.meta.env.VITE_APP_API_URL

export const fetchNoToken = async ({ endpoint = '', params = {}, data = {}, method = 'GET', alert = true }) => {
    try {
        if (method === 'GET') {
            const resp = await axios({
                withCredentials: true,
                method,
                baseURL,
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
                withCredentials: true,
                method,
                baseURL,
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

        if (alert) msgFetchAlert(errorFetch)

        return errorFetch
    }
}

export const fetchByToken = async ({ endpoint = '', params = {}, data = {}, method = 'GET', alert = true }) => {

    const token = localStorage.getItem('token') || ''

    try {
        if (token !== '') {
            if (method === 'GET') {
                const resp = await axios({
                    withCredentials: true,
                    method,
                    baseURL,
                    headers: {
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

                if (bodyResponse.hasOwnProperty('msg') && alert) {
                    msgFetchAlert(bodyResponse)
                }

                return bodyResponse
            } else {
                const resp = await axios({
                    withCredentials: true,
                    method,
                    baseURL,
                    url: endpoint,
                    data
                })

                const bodyResponse = JSON.parse(JSON.stringify(resp.data, (key, value) =>
                    typeof value === 'bigint'
                        ? value.toString()
                        : value
                ))

                if (bodyResponse.hasOwnProperty('msg') && alert) {
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

        if (alert) msgFetchAlert(errorFetch)

        return errorFetch
    }
}

export const fetchUpFilesByToken = async ({ endpoint = '', data = {}, method = 'POST', alert = true }) => {

    const token = localStorage.getItem('token') || ''

    const toastLoading = toast.loading(t => (
        <div className='d-flex flex-column'>
            <div>Subiendo archivos...</div>
            <ProgressBar now={0} style={{ height: '5px' }} />
        </div>
    ))

    try {
        const resp = await axios({
            withCredentials: true,
            method,
            baseURL,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            },
            url: endpoint,
            data,
            onUploadProgress: (progressEvent) => {
                let progress = Math.round(100 * (progressEvent.loaded / progressEvent.total))

                toast.loading(t => (
                    <div className='d-flex flex-column'>
                        <div>Subiendo archivos...</div>
                        <ProgressBar now={progress} style={{ height: '5px' }} />
                    </div>
                ), {
                    id: toastLoading
                })
            },
        })

        const bodyResponse = JSON.parse(JSON.stringify(resp.data, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value
        ))

        if (bodyResponse.hasOwnProperty('msg') && alert) {
            msgFetchAlert(bodyResponse)
        }

        toast.dismiss(toastLoading)

        return bodyResponse
    } catch (err) {
        console.log(err)
        const errorFetch = { ok: false, msg: err.hasOwnProperty('response') ? err.response.data.msg : [{ content: err.message, delay: 5000, type: 'error' }] }

        toast.remove(toastLoading)
        if (alert) msgFetchAlert(errorFetch)

        return errorFetch
    }
}