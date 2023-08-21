const baseUrl = import.meta.env.VITE_APP_API_URL

export const imageGet = (pathImage = '', options = { size: 0, thumb: false }) => {

    let url = pathImage

    if (typeof options.size === 'number' && options.size > 0) {
        url = `${url.replace('image/upload', `image/upload/q_90,${options.thumb ? 'c_thumb' : 'c_fit'},w_${options.size},h_${options.size}`)}`
    } else {
        url = `${url.replace('image/upload', `image/upload/q_90`)}`
    }

    return url
}

export const imageSysGet = (code) => {
    const url = `${baseUrl}/resource/image/sys/${code}`

    return url
}

export const previewImageResource = (type, url, size = 0) => {
    try {
        return ({
            'jpeg': imageGet(url, { size }),
            'jpg': imageGet(url, { size }),
            'png': imageGet(url, { size }),
            'gif': imageGet(url, { size }),
            'xlsx': imageSysGet(2007),
            'docx': imageSysGet(2008),
            'avi': imageSysGet('file_avi'),
            'cfb': imageSysGet('file_cfb'),
            'css': imageSysGet('file_css'),
            'exe': imageSysGet('file_exe'),
            'flv': imageSysGet('file_flv'),
            'html': imageSysGet('file_html'),
            'kmz': imageSysGet('file_kmz'),
            'mp3': imageSysGet('file_mp3'),
            'mp4': imageSysGet('file_mp4'),
            'ogg': imageSysGet('file_ogg'),
            'pdf': imageSysGet('file_pdf'),
            'ppt': imageSysGet('file_ppt'),
            'rar': imageSysGet('file_rar'),
            'txt': imageSysGet('file_txt'),
            'zip': imageSysGet('file_zip')
        }[type])
    } catch (err) {
        console.log(err)
        return imageSysGet(2000)
    }
}

export const getFileIcon = (format) => {
    try {
        return ({
            'jpeg': imageSysGet(2005),
            'jpg': imageSysGet(2005),
            'png': imageSysGet(2005),
            'gif': imageSysGet(2005),
            'xlsx': imageSysGet(2007),
            'docx': imageSysGet(2008),
            'avi': imageSysGet('file_avi'),
            'cfb': imageSysGet('file_cfb'),
            'css': imageSysGet('file_css'),
            'exe': imageSysGet('file_exe'),
            'flv': imageSysGet('file_flv'),
            'html': imageSysGet('file_html'),
            'kmz': imageSysGet('file_kmz'),
            'mp3': imageSysGet('file_mp3'),
            'mp4': imageSysGet('file_mp4'),
            'ogg': imageSysGet('file_ogg'),
            'pdf': imageSysGet('file_pdf'),
            'ppt': imageSysGet('file_ppt'),
            'rar': imageSysGet('file_rar'),
            'txt': imageSysGet('file_txt'),
            'zip': imageSysGet('file_zip')
        }[format])
    } catch (err) {
        console.log(err)
        return imageSysGet(2000)
    }
}