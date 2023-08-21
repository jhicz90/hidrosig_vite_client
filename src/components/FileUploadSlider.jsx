import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { filesize } from 'filesize'
import { useKeenSlider } from 'keen-slider/react'
import { IoMdTrash } from 'react-icons/io'
import { TagTimeAgo } from '.'
import { previewImageResource } from '../helpers'

import 'keen-slider/keen-slider.min.css'

export const FileUploadSlider = ({ files = [], actionDelete = null }) => {

    const [sliderRef] = useKeenSlider(
        {
            mode: 'free-snap',
            slides: {
                origin: 'center',
                perView: 2,
                spacing: 30,
            },
        },
        [MutationPlugin]
    )

    return (
        <>
            {
                files.length === 0
                    ?
                    <p className='text-center fw-bold py-3'>No ahi archivos o documentos</p>
                    :
                    <FileUploadStyle ref={sliderRef} className='keen-slider'>
                        {
                            files.map(file =>
                                <div key={file._id} className='keen-slider__slide shadow rounded'>
                                    <img className='img-fluid' src={previewImageResource(file.format, file.metadata?.url, 400)} alt={file.fileName} />
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '20px',
                                            left: '20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <small
                                            className='d-inline-block text-truncate'
                                            style={{ maxWidth: '150px' }}
                                            title={file.fileName}
                                        >
                                            {file.fileName}
                                        </small>
                                        <small className='d-block'>Tamaño: {filesize(file.bytes !== undefined ? file.bytes : 0)}</small>
                                        <small className="d-block">Subido el: <TagTimeAgo timestamp={file.createdAt} /></small>
                                    </div>
                                    <Button
                                        onClick={() => actionDelete(file._id)}
                                        variant='neutral'
                                        size='sm'
                                        className='d-flex align-items-center text-danger border-danger'
                                        style={{
                                            position: 'absolute',
                                            bottom: '20px',
                                            right: '20px'
                                        }}
                                    >
                                        <IoMdTrash size={20} />
                                    </Button>
                                </div>
                            )
                        }
                    </FileUploadStyle>
            }
        </>

    )
}

const MutationPlugin = (slider) => {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            slider.update()
        })
    })
    const config = { childList: true }

    slider.on('created', () => {
        observer.observe(slider.container, config)
    })
    slider.on('destroyed', () => {
        observer.disconnect()
    })
}

const FileUploadStyle = styled.div`
   & .keen-slider__slide {
        margin-top: 20px;
        margin-bottom: 20px;
        height: 300px;
        background-color: white;
    }
`