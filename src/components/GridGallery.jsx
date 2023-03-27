import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IoMdTrash } from 'react-icons/io'
import { imageGet, imageSysGet } from '../helpers'
import { ImageLightbox } from './ImageLightbox'

export const GridGallery = ({ title = '', actionElement = null, elements = [] }) => {

    const [openLightbox, setOpenLightbox] = useState(false)
    const [imagesLightbox, setImagesLightbox] = useState([])
    const [indexImageLightbox, setIndexImageLightbox] = useState(0)

    const handleLightbox = (images, index) => {
        setImagesLightbox(images)
        setIndexImageLightbox(index)
        setOpenLightbox(true)
    }

    return (
        <>
            <GridGalleryStyled className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2' >
                {actionElement}
                {
                    elements.map((e, index) => {
                        const imageData = elements.map(({ cloud, metadata }) => ({
                            src: imageGet(metadata.url, { cloud }),
                            loading: 'lazy',
                            alt: metadata.id
                        }))

                        return (
                            <div
                                key={e.metadata.id}
                                className='col'
                                style={{ minHeight: '200px' }}
                            >
                                <div
                                    className='border rounded-2 gg-item'
                                >
                                    <button className='btn btn-light text-danger'>
                                        <IoMdTrash size={20} />
                                    </button>
                                    <a onClick={() => handleLightbox(imageData, index)}>
                                        {/* <Link to={e.link}> */}
                                        <img
                                            src={
                                                (e.metadata.url !== '' && e.metadata.url !== null && e.metadata.url !== undefined)
                                                    ? imageGet(e.metadata.url, { cloud: e.cloud, size: 200, thumb: true })
                                                    : imageSysGet(2010)
                                            }
                                            width={200}
                                            height={200}
                                        />
                                        {/* </Link> */}
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }
            </GridGalleryStyled>
            <ImageLightbox
                galleryTitle={title}
                currentImageIndex={indexImageLightbox}
                setCurrentIndex={setIndexImageLightbox}
                isOpen={openLightbox}
                onClose={() => {
                    setOpenLightbox(false)
                    setImagesLightbox([])
                }}
                images={imagesLightbox}
            />
        </>
    )
}

const GridGalleryStyled = styled.div`
    /* grid-template-columns: repeat(4, minmax(200px, 1fr));
    grid-auto-rows: 200px;
    grid-gap: 10px; */

    & .gg-item {
        position: relative;
        overflow: hidden;

        & button {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 2;
        }

        &:hover{ 
            & a::before {
                opacity: 0.3;
                transition: opacity 0.5s;
            }

            & img {
                transform: translate3d(0, 0, 0);
                transition: opacity 0.35s, transform 0.35s;
            }
        }

        & a {
            display: block;
            width: 100%;
            height: auto;
            position: relative;
            overflow: hidden;

            &::before {
                content: '';
                display: block;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: #000;
                z-index: 1;
                opacity: 0;
                transition: opacity 0.4s;
            }

            & img {
                width: calc(100% + 50px);
                max-width: calc(100% + 50px);
                transition: opacity 0.35s, transform 0.35s;
                transform: translate3d(-40px, 0, 0);
            }
        }
    }
`
