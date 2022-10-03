import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRate, startGetSigaRates } from '../../../store/siga'

export const ReportListRates = () => {

    const dispatch = useDispatch()
    const { listRate } = useSelector(state => state.siga)

    useEffect(() => {
        dispatch(startGetSigaRates({ type: 1 }))
    }, [dispatch])

    const onChangeRate = (e) => {
        dispatch(setRate(e.target.value))
    }

    return (
        <div className='input-group mb-2'>
            <label htmlFor='rates' className='input-group-text col-3'>Año - Tarifa</label>
            <select
                onChange={onChangeRate}
                id='rates'
                className='form-select col-9'
            >
                <option value={''}>Elija la tarifa</option>
                {
                    listRate.map(lr =>
                        <option
                            key={`rate${lr.idAnnoTarifa}`}
                            value={lr.idAnnoTarifa}
                        >
                            {`${lr.Anno} - ${lr.idCampanaAgricola === 2 ? 'II GRANDE' : 'I CHICA'}`}
                        </option>
                    )
                }
            </select>
        </div>
    )
}
