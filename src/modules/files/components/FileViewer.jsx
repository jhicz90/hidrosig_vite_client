import { useState, useEffect, forwardRef } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Modal } from 'react-bootstrap'
import { IoMdArrowBack, IoMdArrowForward, IoMdDownload, IoMdPhotos, IoMdPrint, IoMdTrash } from 'react-icons/io'
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs'
import Flicking, { ViewportSlot } from '@egjs/react-flicking'
import { Arrow } from "@egjs/flicking-plugins";
import { Document, Page } from 'react-pdf/dist/esm/entry.vite'
import SimpleBar from 'simplebar-react'
import { getFileIcon, imageGet } from '../../../helpers'

import '@egjs/react-flicking/dist/flicking.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'simplebar-react/dist/simplebar.min.css'

export const FileViewer = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { state } = useLocation()
    const [title, setTitle] = useState('')
    const [format, setFormat] = useState('')
    const { w } = Object.fromEntries([...searchParams])

    useEffect(() => {
        if (w === 'viewer') { }
    }, [w])

    return (
        <ModalViewerStyled
            show={w === 'viewer' && state?.files?.length > 0}
            onHide={() => setSearchParams()}
            backdrop='static'
            fullscreen
            scrollable
        >
            <Modal.Header>
                <div className='d-flex align-items-center justify-content-between w-100'>
                    <div className='d-flex gap-1 align-items-center'>
                        <Button onClick={() => setSearchParams()} variant='light' style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <IoMdArrowBack color='white' size={30} />
                        </Button>
                        <img className='img-fluid' width={32} src={getFileIcon(format)} alt={title} />
                        <p className='m-0'>{title}</p>
                    </div>
                    <div className='d-flex gap-1'>
                        <Button variant='light' style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <IoMdPhotos color='white' size={30} />
                        </Button>
                        <Button variant='light' style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <IoMdPrint color='white' size={30} />
                        </Button>
                        <Button variant='light' style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <IoMdDownload color='white' size={30} />
                        </Button>
                        <Button variant='light' style={{ backgroundColor: 'transparent', border: 'none' }}>
                            <IoMdTrash color='red' size={30} />
                        </Button>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body className='p-0'>
                <Flicking
                    adaptive={true}
                    moveType='snap'
                    panelsPerView={1}
                    defaultIndex={state?.index || 0}
                    bound={false}
                    align='center'
                    plugins={[new Arrow()]}
                    onChanged={(e) => {
                        const { fileName, format } = state?.files[e.index]

                        setTitle(`${fileName}.${format}`)
                        setFormat(format)
                    }}
                >
                    {
                        state?.files?.map((file) => {
                            return {
                                'png': <ViewerImage key={file.code} src={file.metadata.url} />,
                                'jpg': <ViewerImage key={file.code} src={file.metadata.url} />,
                                'jpeg': <ViewerImage key={file.code} src={file.metadata.url} />,
                                'pdf': <ViewerDocPdf key={file.code} src={file.metadata.url} />
                            }[file.format] || <ViewerUnknownFile key={file.code} file={file} />
                        })
                    }
                    <ViewportSlot>
                        <ArrowPrev className='flicking-arrow-prev'>
                            <BsCaretLeftFill size={30} />
                        </ArrowPrev>
                        <ArrowNext className='flicking-arrow-next'>
                            <BsCaretRightFill size={30} />
                        </ArrowNext>
                    </ViewportSlot>
                </Flicking>
            </Modal.Body>
        </ModalViewerStyled>
    )
}

const ViewerUnknownFile = forwardRef(({ file }, ref) => {
    return (
        <ViewerUnknownFileStyled ref={ref}>
            <div>
                <div>
                    El archivo <span className='text-decoration-underline'>{`${file.fileName}.${file.format}`}</span> no puede visualizarse
                    <p className='m-0'>Si piensa que ah habido un error, por favor comuniquese con el administrador.</p>
                    <div className='d-flex flex-row justify-content-between mt-3'>
                        <Button variant='warning'>
                            Notificar
                        </Button>
                        <Button>
                            Ver documentación
                        </Button>
                    </div>
                </div>
            </div>
        </ViewerUnknownFileStyled>
    )
})

const ViewerImage = forwardRef(({ src = '' }, ref) => {
    return (
        <ViewerImageStyled ref={ref}>
            <img src={imageGet(src, { cloud: true, size: 900 })} alt={src} loading='lazy' />
        </ViewerImageStyled>
    )
})

const ViewerDocPdf = forwardRef(({ src = '' }, ref) => {

    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
        setPageNumber(1)
    }

    const changePage = (page) => {
        setPageNumber(page)
    }

    const changePagePrevNext = (offset) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset)
    }

    const previousPage = () => {
        changePagePrevNext(-1)
    }

    const nextPage = () => {
        changePagePrevNext(1)
    }

    return (
        <ViewerDocPdfStyled ref={ref}>
            <SimpleBar className='view-doc'>
                <Document
                    className='d-flex justify-content-center'
                    file={src}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} height={1000} />
                </Document>
            </SimpleBar>
            <div className='nav-pages mb-3 position-absolute bottom-0 start-50 translate-middle-x'>
                <button
                    type='button'
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                >
                    <IoMdArrowBack size={20} />
                </button>
                <p>
                    Página <select
                        value={Number(pageNumber)}
                        onChange={(e) => changePage(Number(e.target.value))}
                        className='mx-1 rounded'
                    >
                        {
                            (function (rows, i, len) {
                                while (++i <= len) {
                                    rows.push(i)
                                }
                                return rows;
                            })([], 0, numPages).map((op, index) => <option key={`option-page-${index}-${new Date().getTime()}`} value={op}>{op}</option>)
                        }
                    </select> de {numPages || '--'}
                </p>
                <button
                    type='button'
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                >
                    <IoMdArrowForward size={20} />
                </button>
            </div>
        </ViewerDocPdfStyled>
    )
})

const ModalViewerStyled = styled(Modal)`
    --bs-modal-bg: rgba(17, 24, 39,0.8);

    & .modal-header {
        height: 60px;
        border-bottom: none;
        background-color: transparent !important;
        background: linear-gradient(to bottom,rgba(0,0,0,.65) 0%,transparent 100%);
    }
`

const ViewerUnknownFileStyled = styled.div`
    height: calc(100vh - 60px);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    & > div {
        min-width: 300px;
        margin-top: 20px;
        margin-bottom: 20px;

        & > div {
            background-color: #4c494c;
            border-radius: 12px;
            color: #fff;
            margin-bottom: 40px;
            padding: 20px;
            text-align: center;
            box-shadow: 0px 10px 12px 5px rgba(0,0,0,.2);
        }
    }
`

const ViewerImageStyled = styled.div`
    height: calc(100vh - 60px);
    overflow: hidden;
    display: flex;
    align-items: center;

    & img {
        object-fit: scale-down;
        padding: 1rem;
        width: 100%;
        height: 100%;
    }
`

const ViewerDocPdfStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    & .view-doc {
        width: 100%;
        height: calc(100vh - 60px);
    }

    & .nav-pages:hover {
        opacity: 1;
    }

    & .nav-pages {
        transition: opacity 0.3s;
        opacity: 0.4;
        background-color: #f5f8fa;
        color: black;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: absolute;
        border: 1px solid grey;
        border-radius: 9px;
        overflow: hidden;

        & button {
            border: none;
            padding: 8px;
            background-color: transparent;

            &:first-of-type {
                border-right: 1px solid grey;
            }

            &:last-of-type {
                border-left: 1px solid grey;
            }
        }

        & p {
            margin: 0;
            padding-left: 8px;
            padding-right: 8px;
        }
    }
`

const ArrowPrev = styled.span`
    color: white;
    padding: 8px;
    position: absolute;
    top: 40%;
    left: 0;
    z-index: 1;
    transition: all 0.3s;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid white;

    &.flicking-arrow-disabled {
        color: grey;
        border-color: grey;
        cursor: auto;
    }
`

const ArrowNext = styled.span`
    color: white;
    padding: 8px;
    position: absolute;
    top: 40%;
    right: 0;
    z-index: 1;
    transition: all 0.3s;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid white;
    
    &.flicking-arrow-disabled {
        color: grey;
        border-color: grey;
        cursor: auto;
    }
`