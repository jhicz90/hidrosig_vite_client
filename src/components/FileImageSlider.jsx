import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { filesize } from 'filesize'
import { IoMdTrash } from 'react-icons/io'
import { useKeenSlider } from 'keen-slider/react'
import { TimeAgo } from '.'
import { previewImageResource } from '../helpers'

import 'keen-slider/keen-slider.min.css'

export const FileImageSlider = ({ images = [], actionDelete = null }) => {

    const [sliderRef] = useKeenSlider({
        mode: 'free-snap',
        slides: {
            origin: 'center',
            perView: 2,
            spacing: 30,
        },
    })

    return (
        <>
            {
                images.length === 0
                    ?
                    <p className='text-center fw-bold py-3'>No ahi imagenes</p>
                    :
                    <FileImageStyle ref={sliderRef} className='keen-slider'>
                        {
                            images.map(image =>
                                <div className='keen-slider__slide shadow rounded'>
                                    <img className='img-fluid' src={previewImageResource(image.format, image.metadata?.url, image.cloud, 400)} alt={image.fileName} />
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
                                            title={image.fileName}
                                        >
                                            {image.fileName}
                                        </small>
                                        <small className='d-block'>Tamaño: {filesize(image.bytes !== undefined ? image.bytes : 0)}</small>
                                        <small className="d-block">Subido el: <TimeAgo timestamp={image.createdAt} /></small>
                                    </div>
                                    <Button
                                        onClick={() => actionDelete(image._id)}
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
                    </FileImageStyle>
            }
        </>
    )
}

const FileImageStyle = styled.div`
    & .keen-slider__slide {
        margin-top: 20px;
        margin-bottom: 20px;
        height: 300px;
        background-color: white;
    }
`