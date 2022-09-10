import React from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { hideExportData, seeExportData } from '../actions'

export const ExportData = ({ title, data }) => {

    const dispatch = useDispatch()
    const { exportData } = useSelector(state => state.ui)

    const onHide = () => {
        dispatch(hideExportData())
    }

    return (
        <>
            <button
                onClick={() => dispatch(seeExportData())}
                className="btn btn-neutral"
            >
                Exportar
            </button>
            <Modal
                show={exportData}
                onHide={onHide}
                backdrop='static'
            >
                <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title>
                        Exportar {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-8">
                                <div className="mb-3">
                                    <label htmlFor="typeexport" className="form-label">Formato a exportar</label>
                                    <select id="typeexport" name="names" className="form-select">
                                        <option value={1}>PDF</option>
                                        <option value={2}>EXCEL</option>
                                        <option value={3}>CVS</option>
                                        <option value={4}>ZIP</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={onHide}
                        className="btn btn-neutral me-1">Cancelar</button>
                    <button className="btn btn-primary">Exportar</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
