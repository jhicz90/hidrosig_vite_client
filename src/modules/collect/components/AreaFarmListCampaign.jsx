import React, { useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Accordion, Card, Collapse, ListGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { CampaignsLoader, ScrollbarsShadow } from '../../../components'
import { useGetListYearDebtByFarmQuery } from '../../../store/actions'
import { getYearActive } from '../../../helpers'
import { GenerateFeeAccount } from './GenerateFeeAccount'

export const AreaFarmListCampaign = () => {

    const { prpid } = useParams()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const { cmp, irr } = Object.fromEntries([...searchParams])
    const { data: listDebts = [], isFetching } = useGetListYearDebtByFarmQuery(prpid, { skip: !prpid })
    const yearActive = useMemo(() => getYearActive(listDebts), [listDebts])

    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    return (
        !!prpid
        &&
        <React.Fragment>
            {/* <ListGroup>
                {
                    ['Convenios', 'Actual - 2023', '2022', '2021', '2020', '2019'].map(yr =>
                        <ListGroup.Item key={yr}>
                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                <div className='d-flex flex-column'>
                                    <div>
                                        {yr}
                                    </div>
                                    <div className='text-muted' style={{ fontSize: '0.75rem' }}>TOMA #1111</div>
                                </div>
                                <div className='d-flex flex-column'>
                                    <div>
                                        Deuda inicial: S/. 0.00
                                    </div>
                                    <div>
                                        Saldo S/. 0.00
                                    </div>
                                </div>
                            </div>
                        </ListGroup.Item>
                    )
                }
            </ListGroup> */}
            {
                isFetching
                    ?
                    <CampaignsLoader />
                    :
                    <React.Fragment>
                        <ListGroup>
                            <ListGroup.Item
                                onClick={() => setOpen(!open)}
                            >
                                <div className='d-flex flex-row justify-content-between align-items-center w-100 me-4'>
                                    <div>
                                        CONVENIOS
                                    </div>
                                    <div className='d-flex flex-column' style={{ fontSize: '14px' }}>
                                        <div className='d-flex justify-content-between w-100'>
                                            <div>Saldo convenio:</div>
                                            <div style={{ textAlign: 'right', width: '10ch' }}>S/. 0.00</div>
                                        </div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                            <Collapse in={open}>
                                <div className='border-start border-end'>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                    terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                    labore wes anderson cred nesciunt sapiente ea proident.
                                </div>
                            </Collapse>
                            <ListGroup.Item
                                onClick={() => setOpen2(!open2)}
                            >
                                <div className='d-flex flex-row justify-content-between align-items-center w-100 me-4'>
                                    <div>
                                        ACTUAL - 2023
                                    </div>
                                    <div className='d-flex flex-column' style={{ fontSize: '14px' }}>
                                        <div className='d-flex justify-content-between w-100'>
                                            <div>Deuda inicial:</div>
                                            <div style={{ textAlign: 'right', width: '10ch' }}>S/. 0.00</div>
                                        </div>
                                        <div className='d-flex justify-content-between w-100'>
                                            <div>Saldo:</div>
                                            <div style={{ textAlign: 'right', width: '10ch' }}>S/. 0.00</div>
                                        </div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                            <Collapse in={open2}>
                                <div className='border-start border-end'>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                                    terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                                    labore wes anderson cred nesciunt sapiente ea proident.
                                </div>
                            </Collapse>
                            <ListGroup.Item>
                                Total de años 2
                            </ListGroup.Item>
                        </ListGroup>
                        {
                            listDebts.length > 0
                                ?
                                <Accordion defaultActiveKey={getYearActive(listDebts) || ''}>
                                    <Accordion.Item eventKey='convenios'>
                                        <Accordion.Header>
                                            <div className='d-flex flex-row justify-content-between align-items-center w-100 me-4'>
                                                <div>
                                                    CONVENIOS
                                                </div>
                                                <div className='d-flex flex-column' style={{ fontSize: '14px' }}>
                                                    <div className='d-flex justify-content-between w-100'>
                                                        <div>Saldo convenio:</div>
                                                        <div style={{ textAlign: 'right', width: '10ch' }}>S/. 0.00</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body className='p-0'>
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item variant='success' action>CONVENIO #2023A2RU - CANCELADO</ListGroup.Item>
                                                <ListGroup.Item variant='danger' action>CONVENIO #2021P123 - PENDIENTE</ListGroup.Item>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {
                                        listDebts.filter(d => String(d._id) === yearActive).map(debt =>
                                            <Accordion.Item key={`year_${debt._id}`} eventKey={String(debt._id)}>
                                                <Accordion.Header>
                                                    <div className='d-flex flex-row justify-content-between align-items-center w-100 me-4'>
                                                        <div>
                                                            {`${yearActive === String(debt._id) ? `ACTUAL - ${debt._id}` : debt._id}`}
                                                        </div>
                                                        <div className='d-flex flex-column' style={{ fontSize: '14px' }}>
                                                            <div className='d-flex justify-content-between w-100'>
                                                                <div>Deuda inicial:</div>
                                                                <div style={{ textAlign: 'right', width: '10ch' }}>S/. 0.00</div>
                                                            </div>
                                                            <div className='d-flex justify-content-between w-100'>
                                                                <div>Saldo:</div>
                                                                <div style={{ textAlign: 'right', width: '10ch' }}>S/. 0.00</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0 pb-3'>
                                                    <ListGroup variant='flush'>
                                                        {
                                                            debt.campaigns.map(c =>
                                                                <ListGroupCampaign
                                                                    key={`campaign_${c._id}_${c.inputIrrigation._id}`}
                                                                    onClick={() => navigate(`?cmp=${c._id}&irr=${c.inputIrrigation._id}`)}
                                                                    action
                                                                    selected={(cmp === c._id && irr === c.inputIrrigation._id) ? true : false}
                                                                >
                                                                    <div className='d-flex flex-row justify-content-between align-items-center'>
                                                                        <div className='d-flex flex-column'>
                                                                            <div>
                                                                                Campaña {c.campaign === 1 ? `CHICA I ${c.opened ? ' (A)' : ' (C)'}` : `GRANDE II ${c.opened ? ' (A)' : ' (C)'}`}
                                                                            </div>
                                                                            <div className='text-muted' style={{ fontSize: '0.75rem' }}>TOMA #{c.inputIrrigation.code.slice(-5)}</div>
                                                                        </div>
                                                                        <div className='d-flex flex-column' style={{ fontSize: '14px' }}>
                                                                            <div className='d-flex justify-content-between w-100'>
                                                                                <div>Deuda inicial:</div>
                                                                                <div style={{ textAlign: 'right', width: '10ch' }}>S/. 0.00</div>
                                                                            </div>
                                                                            <div className='d-flex justify-content-between w-100'>
                                                                                <div>Saldo:</div>
                                                                                <div style={{ textAlign: 'right', width: '10ch' }}>S/. 0.00</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </ListGroupCampaign>
                                                            )
                                                        }
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    }
                                    {
                                        listDebts.filter(d => String(d._id) !== yearActive).length > 0
                                        &&
                                        <ScrollbarsShadow autoHide autoHeight autoHeightMin={200} autoHeightMax={200}>
                                            {
                                                listDebts.filter(d => String(d._id) !== yearActive).map(debt =>
                                                    <Accordion.Item key={`year_${debt._id}`} eventKey={String(debt._id)}>
                                                        <Accordion.Header>
                                                            {debt._id}
                                                        </Accordion.Header>
                                                        <Accordion.Body className='p-0 pb-3'>
                                                            <ListGroup variant='flush'>
                                                                {
                                                                    debt.campaigns.map(c =>
                                                                        <ListGroupCampaign
                                                                            key={`campaign_${c._id}_${c.inputIrrigation._id}`}
                                                                            onClick={() => navigate(`?cmp=${c._id}&irr=${c.inputIrrigation._id}`)}
                                                                            action
                                                                            selected={(cmp === c._id && irr === c.inputIrrigation._id) ? true : false}
                                                                        >
                                                                            Campaña {c.campaign === 1 ? `CHICA I ${c.opened ? ' (A)' : ' (C)'}` : `GRANDE II ${c.opened ? ' (A)' : ' (C)'}`}
                                                                            <div className='text-muted' style={{ fontSize: '0.75rem' }}>#{c.inputIrrigation.code}</div>
                                                                        </ListGroupCampaign>
                                                                    )
                                                                }
                                                            </ListGroup>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                )
                                            }
                                        </ScrollbarsShadow>
                                    }
                                </Accordion>
                                :
                                <div className='d-flex flex-column gap-2 p-4 justify-content-center'>
                                    EL PREDIO NO TIENE NINGUNA DECLARACION O CAMPAÑA
                                    <GenerateFeeAccount prpId={prpid} />
                                </div>
                        }
                    </React.Fragment>
            }
        </React.Fragment>
    )
}

const ListGroupCampaign = styled(ListGroup.Item)`
    & {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    &::before {
        content: '';
        display: ${props => props.selected ? 'block' : 'none'};
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 8px 0 8px 13.9px;
        border-color: transparent transparent transparent #0d6efd;
        transform: rotate(0deg);
        position: absolute;
        left: 0;
        top: 40%;
    }
`