const baseUrl = import.meta.env.VITE_APP_API_URL

export const imageGet = (pathImage = '', options = { cloud: false, size: 0 }) => {

    let url = pathImage

    if (options.cloud) {
        if (typeof options.size === 'number' && options.size > 0) {
            url = `${url.replace('image/upload', `image/upload/q_90,c_fit,w_${options.size},h_${options.size}`)}`
        } else {
            url = `${url.replace('image/upload', `image/upload/q_90`)}`
        }
    } else {
        url = `${url}${(typeof options.size === 'number' && options.size > 0) ? `?size=${String(options.size)}` : ''}`
    }

    return url
}

export const imageSysGet = (code) => {
    const url = `${baseUrl}/resource/image/sys/${code}`

    return url
}