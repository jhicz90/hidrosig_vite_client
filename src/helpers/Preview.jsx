import { imageSysGet } from './ResourceRoute'

export const previewResource = (file) => {
    try {
        const ext = file.name.substring(file.name.lastIndexOf('.') + 1)

        return ({
            'jpeg': URL.createObjectURL(file),
            'jpg': URL.createObjectURL(file),
            'png': URL.createObjectURL(file),
            'gif': URL.createObjectURL(file),
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
        }[ext])
    } catch (err) {
        console.log(err)
        return imageSysGet(2000)
    }
}