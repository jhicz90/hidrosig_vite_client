import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IoMdTrash } from 'react-icons/io'
import { imageGet, imageSysGet } from '../helpers'

export const GridGallery = ({ actionElement = null, elements = [] }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const handleLightbox = (images, index) => {
        navigate(`?w=viewer`, { state: { files: images, index, from: location || null } })
    }

    return (
        <GridGalleryStyled className='rounded-3 border border-2 border-secondary-subtle'>
            {actionElement}
            {
                elements.map((e, index) => {
                    return (
                        <div
                            key={e.metadata.id}
                        >
                            <button className='btn btn-light text-danger'>
                                <IoMdTrash size={20} />
                            </button>
                            <img
                                onClick={() => handleLightbox(elements, index)}
                                className='img-fluid'
                                src={
                                    (e.metadata.url !== '' && e.metadata.url !== null && e.metadata.url !== undefined)
                                        ? imageGet(e.metadata.url, { cloud: e.cloud, size: 400, thumb: true })
                                        : imageSysGet(2010)
                                }
                            />
                        </div>
                    )
                })
            }
        </GridGalleryStyled>
    )
}

const GridGalleryStyled = styled.div`

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    grid-auto-rows: 1fr;
    background-color: #f5f8fa;
    padding: 10px;
    gap: 10px;

    &::before {
        content: '';
        width: 0;
        padding-bottom: 100%;
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }

    & > *:first-child {
        grid-row: 1 / 1;
        grid-column: 1 / 1;
    }

    /* Just to make the grid visible */

    & > * {
        position: relative;
        background: rgba(0,0,0,0.1);
        border: 1px rgba(0, 0, 0, 0.1) solid;
        border-radius: 6px;
        overflow: hidden;

        & button {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 2;
        }
    }
`
