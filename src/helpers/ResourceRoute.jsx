const baseUrl = import.meta.env.VITE_APP_API_URL

export const imageGet = (path) => {
    const url = `${baseUrl}/resource/image/get/${path}`

    return url
}

export const imageSysGet = (code) => {
    const url = `${baseUrl}/resource/image/sys/get/${code}`

    return url
}