import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { filesize } from 'filesize'
import { IoMdTrash } from 'react-icons/io'
import { useKeenSlider } from 'keen-slider/react'
import { TagTimeAgo } from '.'
import { previewImageResource } from '../helpers'

import 'keen-slider/keen-slider.min.css'

export const FileImageSlider = ({ images = [], actionDelete = null }) => {

    const [sliderRef] = useKeenSlider(
        {
            mode: 'free-snap',
            slides: {
                origin: 'center',
                perView: 2,
                spacing: 30,
            }
        },
        [MutationPlugin]
    )

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
                                <div key={image._id} className='keen-slider__slide shadow rounded'>
                                    <img className='img-fluid' src={previewImageResource(image.format, image.metadata?.url, image.cloud, 400)} alt={image.fileName} />
                                    <div className='slider__slide_info'>
                                        <small
                                            className='d-inline-block text-truncate'
                                            style={{ maxWidth: '150px' }}
                                            title={image.fileName}
                                        >
                                            {image.fileName}
                                        </small>
                                        <small className='d-block'>Tamaño: {filesize(image.bytes !== undefined ? image.bytes : 0)}</small>
                                        <small className="d-block">Subido el: <TagTimeAgo timestamp={image.createdAt} /></small>
                                    </div>
                                    <Button
                                        onClick={() => actionDelete(image._id)}
                                        variant='neutral'
                                        size='sm'
                                        className='slider__slide_btn d-flex align-items-center text-danger border-danger'
                                        style={{
                                            position: 'absolute',
                                            bottom: '10px',
                                            right: '10px'
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

const MutationPlugin = (slider) => {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            slider.update()
        })
    })
    const config = { childList: true }

    slider.on("created", () => {
        observer.observe(slider.container, config)
    })
    slider.on("destroyed", () => {
        observer.disconnect()
    })
}

const FileImageStyle = styled.div`
    & .keen-slider__slide {
        margin-top: 20px;
        margin-bottom: 20px;
        height: 300px;
        background-color: white;

        & img {
            background-color: transparent;
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
        }

        & .slider__slide_info {
            position: absolute;
            bottom: 10px;
            left: 10px;
            display: flex;
            flex-direction: column;
            background-color: rgba(100, 100, 100, 0.3);
            padding: 0.25rem;
            font-size: 0.75rem;
            font-weight: bold;
            border-radius: 6px;
        }

        & .slider__slide_btn {
            position: absolute;
            bottom: 10px;
            right: 10px;
        }
    }
`