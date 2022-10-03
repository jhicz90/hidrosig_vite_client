import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setReport } from '../../../store/siga'

export const ReportListType = () => {

    const dispatch = useDispatch()
    const { reportList } = useSelector(state => state.siga)

    const onChangeReport = (e) => {
        dispatch(setReport(e.target.value))
    }

    return (
        <div className='input-group mb-2'>
            <label htmlFor='typereport' className='input-group-text col-3'>Tipo de reporte</label>
            <select
                onChange={onChangeReport}
                id='typereport'
                className='form-select col-9'
            >
                <option value={''}>Elija un tipo de reporte</option>
                {
                    reportList.map(lr =>
                        <option key={lr} value={lr}>{lr}</option>
                    )
                }
            </select>
        </div>
    )
}
