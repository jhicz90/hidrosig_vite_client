import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCommittee, startGetSigaComms } from '../../../store/actions'

export const ReportListComms = () => {

    const dispatch = useDispatch()
    const { listCommittee } = useSelector(state => state.siga)

    useEffect(() => {
        dispatch(startGetSigaComms())
    }, [dispatch])

    const onChangeComm = (e) => {
        dispatch(setCommittee(e.target.value))
    }

    return (
        <div className='input-group mb-2'>
            <label htmlFor='comms' className='input-group-text col-3'>Comisiones</label>
            <select
                onChange={onChangeComm}
                id='comms'
                className='form-select col-9'
            >
                <option value={''}>Elija la comisión</option>
                {
                    listCommittee.map(lr =>
                        <option key={lr.idComision} value={lr.idComision}>{lr.Comision}</option>
                    )
                }
            </select>
        </div>
    )
}
