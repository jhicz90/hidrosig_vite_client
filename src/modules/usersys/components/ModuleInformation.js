import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import AsyncSelect from 'react-select/async'
import { UseDateHeader, UseDateOne, UseForm } from '../../../hooks'
import { searchOccup, startUpdateActiveUserSysInfo } from '../../../actions'
import { chckProp } from '../../../helpers'
import { Image } from '../../../components'

export const UserSysInformationModule = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.usersys)
    const [formValues, , handleInputChange] = UseForm({
        names: active.names,
        surnames: active.surnames,
        docid: active.docid,
        gender: active.gender
    })
    const [dateValue, , handleDateChange] = UseDateOne(active.birthday)
    const [occupation, setOccupation] = useState(active.occupation)

    const { names, surnames, docid, gender } = formValues

    const handleChange = (value) => {
        setOccupation(value)
    }

    const handleSave = () => {
        dispatch(startUpdateActiveUserSysInfo({
            names,
            surnames,
            birthday: dateValue,
            docid,
            occupation: occupation !== null ? occupation._id : null,
            gender
        }))
    }

    return (
        <Card>
            <Card.Body>
                <div className="row mb-3">
                    <div className="col-12 col-md-6">
                        <label htmlFor="names" className="form-label">Nombres</label>
                        <input value={names} onChange={handleInputChange} type="text" id="names" name="names" className="form-control" autoComplete="off" />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="surnames" className="form-label">Apellidos</label>
                        <input value={surnames} onChange={handleInputChange} type="text" id="surnames" name="surnames" className="form-control" autoComplete="off" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-6">
                        <label htmlFor="birthday" className="form-label">Fecha de nacimiento</label>
                        <ReactDatePicker
                            renderCustomHeader={UseDateHeader}
                            dateFormat="dd/MM/yyyy"
                            withPortal
                            selected={dateValue}
                            onChange={handleDateChange}
                            id="birthday"
                            className="form-control"
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="docid" className="form-label">Documento de identidad</label>
                        <input value={docid} onChange={handleInputChange} type="text" id="docid" name="docid" className="form-control" autoComplete="off" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-md-6">
                        <label htmlFor="occup" className="form-label">Ocupación</label>
                        <AsyncSelect
                            cacheOptions
                            defaultOptions
                            isClearable
                            inputId="occup"
                            value={occupation}
                            getOptionLabel={e =>
                                <div className="d-flex">
                                    <Image img={chckProp(e, 'image') ? e.image.fileNameThumbnail : ''} noImg={1085} width={32} height={32} />
                                    <span className="ms-2 align-self-center">{e.name}</span>
                                </div>
                            }
                            getOptionValue={e => e._id}
                            loadOptions={searchOccup}
                            onChange={handleChange}
                            placeholder="Busque la ocupación"
                            loadingMessage={() => 'Buscando...'}
                            noOptionsMessage={() => 'Sin resultados'}
                            menuPlacement={'auto'}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <label htmlFor="gender" className="form-label">Género</label>
                        <select
                            value={gender}
                            onChange={handleInputChange}
                            id="gender"
                            name="gender"
                            className="form-select">
                            <option value={"F"}>Femenino</option>
                            <option value={"M"}>Masculino</option>
                            <option value={"O"}>Otro</option>
                        </select>
                    </div>
                </div>
                <div className="row justify-content-end">
                    <div className="col-auto">
                        <button
                            onClick={handleSave}
                            className="btn btn-neutral ui-text-green fw-bold-500"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
