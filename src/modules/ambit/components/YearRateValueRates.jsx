import { useMemo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, Form, Button, Table } from 'react-bootstrap'
import AsyncSelect from 'react-select/async'
import { TooltipInfo } from '../../../components'
import { searchCommitteeByJunta, useAddValueRatesMutation, useGetListCompByJuntaQuery, useGetListIrrigSystemByJuntaQuery, useLazyGetValueRateByJuntaAndCommQuery, yearrateApi } from '../../../store/actions'

export const YearRateValueRates = () => {

    const { yrtid } = useParams()
    const [committee, setCommittee] = useState(null)
    const [valueRates, setValueRates] = useState({})
    const { data = null } = useSelector(yearrateApi.endpoints.getYearRateById.select(yrtid))
    const { data: listComponents = [] } = useGetListCompByJuntaQuery({ junta: data?.junta?._id, search: '' })
    const { data: listIrrigSystems = [] } = useGetListIrrigSystemByJuntaQuery({ junta: data?.junta?._id, search: '' })
    const [addValueRates, { isLoading }] = useAddValueRatesMutation()
    const [getValueRates, { data: listValueRates = [], isFetching }] = useLazyGetValueRateByJuntaAndCommQuery()
    const tableGroup = useMemo(() => [...new Set(listComponents.map(comp => comp.group))], [listComponents])

    const handleSave = (e) => {
        e.preventDefault()
        const irrigs = [...new Set(Object.getOwnPropertyNames(valueRates).map(prop => prop.split('_')[1]))]
        const compns = [...new Set(Object.getOwnPropertyNames(valueRates).map(prop => {
            return {
                irrig: prop.split('_')[1],
                component: prop.split('_')[2],
                value: valueRates[prop]
            }
        }))]

        const saved = irrigs.map(irr => {
            return {
                irrigSystem: irr,
                junta: data?.junta?._id,
                committee: committee._id,
                yearRate: yrtid,
                details: compns.filter(c => c.irrig === irr).map(d => ({ component: d.component, value: d.value }))
            }
        })

        addValueRates(saved)
    }

    const handleChange = (e) => {
        const value = e.target.value
        setValueRates({
            ...valueRates,
            [e.target.name]: Number(value)
        })
    }

    const sumValueRatesByIrrigSysten = (irr, obj) => {
        let sum = 0
        const d = Object.getOwnPropertyNames(obj).filter(prop => prop.split('_').find(sp => sp === irr))

        d.forEach(p => {
            sum = sum + Number(obj[p])
        })

        return sum.toPrecision(5)
    }

    useEffect(() => {
        if (listValueRates.length > 0) {
            setValueRates(state => {
                return {
                    ...state,
                    ...listValueRates.reduce((accumulator, { irrigSystem, details }) => {

                        const detail = {}

                        details.forEach(d => {
                            detail[`value_${irrigSystem._id}_${d.component._id}`] = d.value
                        })

                        return { ...accumulator, ...detail }
                    }, {})
                }
            })
        }
    }, [listValueRates])

    useEffect(() => {
        if (!!committee) {
            setValueRates({})
            getValueRates({ yearrate: yrtid, junta: data?.junta?._id, comm: committee?._id })
        }
    }, [committee])

    return (
        <Card style={{ overflow: 'hidden', backgroundColor: 'aliceblue' }}>
            <Card.Body>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-12 col-md-4'>
                            <Form.Group controlId='newCommittee'>
                                <Form.Label>Comisión de usuarios <TooltipInfo message='Seleccione una comision de usuarios para ver las tarifas por componentes' /></Form.Label>
                                <AsyncSelect
                                    value={committee}
                                    onChange={(v) => setCommittee(v)}
                                    inputId='newCommittee'
                                    classNamePrefix='rc-select'
                                    menuPosition='fixed'
                                    defaultOptions
                                    loadOptions={async (e) => {
                                        return await searchCommitteeByJunta(data?.junta?._id || null, e)
                                    }}
                                    menuPlacement={'auto'}
                                    placeholder={`Buscar...`}
                                    loadingMessage={({ inputValue }) => `Buscando '${inputValue}'`}
                                    noOptionsMessage={({ inputValue }) => `Sin resultados con ...${inputValue}`}
                                    getOptionValue={e => e._id}
                                    getOptionLabel={e => e.name}
                                />
                            </Form.Group>
                        </div>
                    </div>
                </div>
            </Card.Body>
            <form onSubmit={handleSave}>
                <Table className='m-0' responsive bordered striped size='sm'>
                    <thead>
                        <tr>
                            <th
                                rowSpan={2}
                                style={{ verticalAlign: 'middle', textAlign: 'center' }}
                            >
                                SISTEMAS DE RIEGO
                            </th>
                            <th
                                rowSpan={2}
                                style={{ verticalAlign: 'middle', textAlign: 'center' }}
                            >
                                TOTAL
                            </th>
                            {
                                tableGroup.map(group => {
                                    return listComponents.filter(c => c.group === group).map(comp => {
                                        if (group !== '') {
                                            const { _id: index } = listComponents.find(c => c.group === comp.group)
                                            const large = listComponents.filter(c => c.group === comp.group).length

                                            return (
                                                (group === comp.group && comp._id === index)
                                                &&
                                                <th
                                                    key={`header_group_${comp.group}_${comp._id}`}
                                                    colSpan={large}
                                                    style={{ verticalAlign: 'middle', textAlign: 'center' }}
                                                >
                                                    {comp.group}
                                                </th>
                                            )
                                        } else {
                                            return (
                                                <th
                                                    key={`header_1_${comp._id}`}
                                                    rowSpan={2}
                                                    style={{ verticalAlign: 'middle', textAlign: 'center' }}
                                                >
                                                    {comp.name}
                                                </th>
                                            )
                                        }
                                    })
                                })

                            }
                        </tr>
                        <tr>
                            {
                                listComponents.map(comp => {
                                    return (
                                        comp.group !== ''
                                        &&
                                        <th
                                            key={`header_2_${comp._id}`}
                                            style={{ verticalAlign: 'middle', textAlign: 'center' }}
                                        >
                                            {comp.name}
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listIrrigSystems.map(irr =>
                                <tr key={`row_${irr._id}`}>
                                    <td
                                        style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'cornsilk' }}
                                    >
                                        <strong>{irr.name}</strong>
                                    </td>
                                    <td
                                        style={{ verticalAlign: 'middle', textAlign: 'center', backgroundColor: 'cornsilk' }}
                                    >
                                        <strong>{sumValueRatesByIrrigSysten(irr._id, valueRates)}</strong>
                                    </td>
                                    {
                                        listComponents.map(comp =>
                                            <td key={`input_${irr._id}_${comp._id}`} style={{ minWidth: '160px', backgroundColor: 'white' }}>
                                                <input
                                                    disabled={isLoading || isFetching}
                                                    className='form-control'
                                                    name={`value_${irr._id}_${comp._id}`}
                                                    value={valueRates[`value_${irr._id}_${comp._id}`] || 0}
                                                    onChange={handleChange}
                                                    type='number'
                                                    min={0}
                                                    step={0.000001}
                                                    autoComplete='off'
                                                />
                                            </td>
                                        )
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                <div className='d-flex justify-content-end gap-2 m-3'>
                    <Button
                        disabled={isLoading || isFetching || !committee || Object.getOwnPropertyNames(valueRates).length === 0}
                        variant='primary'
                        type='submit'
                    >
                        Guardar cambios
                    </Button>
                </div>
            </form>
        </Card>
    )
}