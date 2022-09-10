import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import { Waypoint } from 'react-waypoint'
import { systemConstants } from '../../types'
import { endListUploadedResource, endModalResource, inputSearchUploadedResource, loadListUploadedResource, startListInfiniteUploadedResource } from '../../actions'
import { FileArchive } from '../FileArchive'
import { LoadingPage } from '../LoadingPage'

export const ListUploaded = () => {

    const dispatch = useDispatch()
    const { modalMultiple, modalSetArchive, searchUploaded, listUploaded, loadingListUploaded, endListUploaded } = useSelector(state => state.resource)
    const [valueSearch] = useDebounce(searchUploaded, systemConstants.searchDebounce)

    const handleInputSearch = (e) => {
        dispatch(inputSearchUploadedResource({ search: e.target.value }))
    }

    const handleClearSearch = () => {
        dispatch(inputSearchUploadedResource({ search: '' }))
        dispatch(endListUploadedResource(false))
        dispatch(loadListUploadedResource([]))
        dispatch(startListInfiniteUploadedResource({ fileType: 'image' }))
    }

    const loadScroll = () => {
        dispatch(startListInfiniteUploadedResource({ fileType: 'image' }))
    }

    const handleSelectFile = (e) => {
        if (!modalMultiple) {
            modalSetArchive(e._id)
            dispatch(endModalResource())
        }
    }

    // Efecto y eventos que se dispara cuando cambia los parametros de busqueda
    useEffect(() => {
        if (valueSearch.length > 2) {
            dispatch(loadListUploadedResource([]))
            dispatch(startListInfiniteUploadedResource({ fileType: 'image' }))
        }
    }, [valueSearch, dispatch])

    useEffect(() => {
        dispatch(startListInfiniteUploadedResource({ fileType: 'image' }))

        return () => {
            dispatch(endListUploadedResource(false))
            dispatch(loadListUploadedResource([]))
            dispatch(startListInfiniteUploadedResource({ fileType: 'image' }))
        }
    }, [dispatch])

    return (
        <>
            <div className="row align-self-start mb-2">
                <div className="col-12 col-sm-auto mb-3 mb-sm-0">
                    <div className="input-group">
                        <label htmlFor="resourcesearch" className="input-group-text">
                            <i className="fas fa-search"></i>
                        </label>
                        <button
                            hidden={searchUploaded.length > 0 ? false : true}
                            onClick={handleClearSearch}
                            type="button"
                            className="btn-inline">
                            <i className="fas fa-backspace"></i>
                        </button>
                        <input
                            value={searchUploaded}
                            onChange={handleInputSearch}
                            name="search"
                            id="resourcesearch"
                            placeholder="Buscar..."
                            type="text"
                            className="form-control"
                            autoComplete="off"
                        />
                    </div>
                </div>
            </div>
            {
                <>
                    {
                        !modalMultiple
                        &&
                        <div className="alert alert-info">
                            Para seleccionar el archivo que desea usar solo de click en él
                        </div>
                    }
                    <div className="resource-gallery">
                        {
                            listUploaded.map(file =>
                                <FileArchive key={file._id} file={file} handleSelect={handleSelectFile} />
                            )
                        }

                    </div>
                    {
                        loadingListUploaded
                        &&
                        <LoadingPage />
                    }
                    {
                        (listUploaded.length > 10 && !endListUploaded)
                        &&
                        <Waypoint onEnter={loadScroll} />
                    }
                </>
            }
        </>
    )
}
