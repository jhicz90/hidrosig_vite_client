const baseUrl = import.meta.env.VITE_APP_API_URL

export const imageGet = (path, options = { size: 0 }) => {
    const url = `${baseUrl}/resource/image/get/${path}${(typeof options.size === 'number' && options.size > 0) ? `?sizeImage=${String(options.size)}` : ''}`

    return url
}

export const imageSysGet = (code) => {
    const url = `${baseUrl}/resource/image/sys/get/${code}`

    return url
}