import { filesize } from 'filesize'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { IoCloseSharp } from 'react-icons/io5'
import { imageSysGet } from '../helpers'
import { IoMdTrash } from 'react-icons/io'

export const FileUpload = ({ file }) => {
    return (
        <FileUploadStyle key={file.fileName}>
            <img src={previewResource(file.format, file.metadata?.url)} alt={file.fileName} />
            <div className='file-info'>
                <div
                    className='d-inline-block text-truncate'
                    style={{
                        maxWidth: '200px',
                        fontWeight: 'bold'
                    }}>
                    {file.fileName}
                </div>
                <small className='d-block'>Tamaño: {filesize(file.bytes !== undefined ? file.bytes : 0)}</small>
            </div>
            <Button
                onClick={() => console.log('SE ELIMINO')}
                variant='outline-light'
                size='sm'
                className='d-flex align-items-center text-danger'
            >
                <IoMdTrash size={20} />
            </Button>
        </FileUploadStyle>
    )
}

const FileUploadStyle = styled.div`
    box-sizing: border-box;
    padding: 4px;
    min-height: 40px;
    user-select: none;
    color: rgb(9, 30, 66);
    display: flex;

    & img {
        width: 40px;
        height: 40px;
        margin-right: 8px;
        flex-shrink: 0;
        flex-grow: 0;
    }

    & .file-info {
        flex-grow: 1;
        flex-basis: 100%;
        display: flex;
        flex-direction: column;
    }
`

const previewResource = (type, file) => {
    try {
        return ({
            'jpeg': file,
            'jpg': file,
            'png': file,
            'gif': file,
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