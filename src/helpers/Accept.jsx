export const acceptFiles = (type) => {
    try {
        return ({
            'images': {
                'image/jpeg': [],
                'image/png': [],
            },
            'videos': {
                'video/x-msvideo': ['.avi'],
                'video/mp4': ['.mp4'],
                'video/webm': ['.webm']
            },
            'docs': {
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                'application/pdf': ['.pdf']
            },
            'geodata': {
                'application/zipped-shapefile': ['.shp'],
                'application/dbase': ['.dbf']
            },
            'word': {
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
            },
            'excel': {
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
            }
        }[type])
    } catch (err) {
        console.log(err)
        return {}
    }
}