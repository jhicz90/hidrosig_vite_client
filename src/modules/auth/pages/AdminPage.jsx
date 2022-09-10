import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'
import CreatableSelect from 'react-select'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'
import { UseDateHeader, UseDateOne,UseForm } from '../../../hooks'
import { registerAdmin } from '../../../actions'

export const AdminPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formAdminValues, , handleAdminInputChange] = UseForm({
        username: '',
        password: '',
        passwordconfirm: '',
        names: '',
        surnames: '',
        docid: '',
        email: '',
        gender: 'M'
    })

    const { username, password, passwordconfirm, names, surnames, docid, email, gender } = formAdminValues

    const [cellphones, setCellphones] = useState([])
    const [telephones, setTelephones] = useState([])
    const [dateValue, , handleDateChange] = UseDateOne(new Date())

    const handleRegisterAdmin = (e) => {
        e?.preventDefault()
        dispatch(registerAdmin({
            username,
            password,
            passwordconfirm,
            names,
            surnames,
            docid,
            birthday: dateValue,
            email,
            gender,
            cellphones: cellphones.map(c => c.value),
            telephones: telephones.map(t => t.value)
        }))
    }

    const handleBackWeb = (e) => {
        e?.preventDefault()
        navigate('/web', { replace: true })
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col sm={8} lg={10} xl={8}>
                    <form onSubmit={handleRegisterAdmin} noValidate>
                        <Row>
                            <Col sm={12} lg={6} xl={6}>
                                <div className="card m-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Usuario</h5>
                                        <div className="mb-3">
                                            <label htmlFor="adminusername" className="form-label">Nombre de usuario</label>
                                            <input
                                                onChange={handleAdminInputChange}
                                                value={username}
                                                id="adminusername"
                                                name="username"
                                                type="text"
                                                className="form-control text-lowercase"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="adminpassw" className="form-label">Contraseña</label>
                                            <input
                                                onChange={handleAdminInputChange}
                                                value={password}
                                                name="password"
                                                id="adminpassw"
                                                type="password"
                                                className="form-control"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="adminpasswconfirm" className="form-label">Confirmar Contraseña</label>
                                            <input
                                                onChange={handleAdminInputChange}
                                                value={passwordconfirm}
                                                name="passwordconfirm"
                                                id="adminpasswconfirm"
                                                type="password"
                                                className="form-control"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={12} lg={6} xl={6}>
                                <div className="card m-3">
                                    <div className="card-body">
                                        <h5 className="card-title">Información del Administrador</h5>
                                        <div className="mb-3">
                                            <label htmlFor="adminnames" className="form-label">Nombres</label>
                                            <input
                                                onChange={handleAdminInputChange}
                                                value={names}
                                                name="names"
                                                id="adminnames"
                                                type="text"
                                                className="form-control"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="adminsurnames" className="form-label">Apellidos</label>
                                            <input
                                                onChange={handleAdminInputChange}
                                                value={surnames}
                                                name="surnames"
                                                id="adminsurnames"
                                                type="text"
                                                className="form-control"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="admindocid" className="form-label">Doc. de identidad</label>
                                            <input
                                                onChange={handleAdminInputChange}
                                                value={docid}
                                                name="docid"
                                                id="admindocid"
                                                type="text"
                                                className="form-control"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="adminbirth" className="form-label">Fecha de nacimiento</label>
                                            <ReactDatePicker
                                                renderCustomHeader={UseDateHeader}
                                                dateFormat="dd/MM/yyyy"
                                                withPortal
                                                selected={dateValue}
                                                onChange={handleDateChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="adminemail" className="form-label">Correo electronico</label>
                                            <input
                                                onChange={handleAdminInputChange}
                                                value={email}
                                                name="email"
                                                id="adminemail"
                                                type="email"
                                                className="form-control"
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="admingender" className="form-label">Género</label>
                                            <select
                                                onChange={handleAdminInputChange}
                                                value={gender}
                                                name="gender"
                                                id="admingender"
                                                className="form-select"
                                            >
                                                <option value="F">Femenino</option>
                                                <option value="M">Masculino</option>
                                                <option value="O">Otro</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="admincellphones" className="form-label">Celulares</label>
                                            <CreatableSelect
                                                inputId="admincellphones"
                                                placeholder="Ingrese los números celulares para contacto"
                                                noOptionsMessage={e => `Sin datos`}
                                                formatCreateLabel={e => `Ingresar celular: "${e}"`}
                                                isValidNewOption={e => validator.isMobilePhone(e, 'es-PE')}
                                                components={{ DropdownIndicator: null }}
                                                onChange={e => setCellphones(e)}
                                                isMulti
                                                value={cellphones}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="adminphones" className="form-label">Télefonos</label>
                                            <CreatableSelect
                                                inputId="adminphones"
                                                placeholder="Ingrese los números de télefonos para contacto"
                                                noOptionsMessage={e => `Sin datos`}
                                                formatCreateLabel={e => `Ingresar télefono: "${e}"`}
                                                isValidNewOption={e => validator.isMobilePhone(e, 'es-PE')}
                                                components={{ DropdownIndicator: null }}
                                                onChange={e => setTelephones(e)}
                                                isMulti
                                                value={telephones}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div
                            className="btn-group btn-group-lg position-fixed"
                            style={{ right: '10px', bottom: '10px' }}
                        >
                            <button
                                onClick={handleBackWeb}
                                className="btn btn-secondary"
                            >
                                Regresar
                            </button>
                            <button
                                onClick={handleRegisterAdmin}
                                className="btn btn-primary"
                                type="submit"
                            >
                                Registrar Administrador
                            </button>
                        </div>
                    </form>
                </Col>
            </Row >
        </Container >
    )
}
