import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, Card, ListGroup } from 'react-bootstrap'
import { ScrollbarsShadow } from '../../../components'
import { setActiveCmpIdInUsrNav, useGetListDebtByFarmQuery } from '../../../store/actions'
import { getCampaignActive, getYearActive } from '../../../helpers'

export const AreaFarmListCampaign = ({ tabId = '' }) => {

    const dispatch = useDispatch()
    const { listSearched = [] } = useSelector(state => state.collect)
    const prpActive = useMemo(() => listSearched.find(ls => ls.id === tabId)?.prpId || null, [listSearched])
    const { data: listDebts = [] } = useGetListDebtByFarmQuery(prpActive)
    const yearActive = useMemo(() => getYearActive(listDebts), [listDebts])
    const campaignActive = useMemo(() => getCampaignActive(yearActive, listDebts), [listDebts, yearActive])

    useEffect(() => {
        dispatch(setActiveCmpIdInUsrNav({ id: tabId, campId: campaignActive }))

        return () => dispatch(setActiveCmpIdInUsrNav({ id: tabId, campId: null }))
    }, [campaignActive])

    return (
        <Card style={{ overflow: 'hidden', minHeight: '100%' }}>
            {
                listDebts.length > 0
                    ?
                    <Accordion flush style={{ borderRadius: '9px' }} defaultActiveKey={getYearActive(listDebts) || ''}>
                        <Accordion.Item eventKey='convenios'>
                            <Accordion.Header>
                                CONVENIOS
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
                                        {`${yearActive === String(debt._id) ? `ACTUAL - ${debt._id}` : debt._id}`}
                                    </Accordion.Header>
                                    <Accordion.Body className='p-0'>
                                        <ListGroup variant='flush'>
                                            {
                                                debt.campaigns.map(c =>
                                                    <ListGroup.Item
                                                        key={`campaign_${c._id}`}
                                                        onClick={() => dispatch(setActiveCmpIdInUsrNav({ id: tabId, campId: c._id }))}
                                                        variant='info'
                                                        action
                                                    >
                                                        Campaña {c.campaign === 1 ? `CHICA I ${c.opened ? ' (A)' : ' (C)'}` : `GRANDE II ${c.opened ? ' (A)' : ' (C)'}`}
                                                    </ListGroup.Item>
                                                )
                                            }
                                        </ListGroup>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        }
                        {
                            listDebts.filter(d => String(d._id) !== yearActive).length > 3
                                ?
                                <ScrollbarsShadow autoHide style={{ height: 200 }}>
                                    {
                                        listDebts.filter(d => String(d._id) !== yearActive).map(debt =>
                                            <Accordion.Item key={`year_${debt._id}`} eventKey={String(debt._id)}>
                                                <Accordion.Header>
                                                    {debt._id}
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush'>
                                                        {
                                                            debt.campaigns.map(c =>
                                                                <ListGroup.Item
                                                                    key={`campaign_${c._id}`}
                                                                    onClick={() => dispatch(setActiveCmpIdInUsrNav({ id: tabId, campId: c._id }))}
                                                                    variant='info'
                                                                    action
                                                                >
                                                                    Campaña {c.campaign === 1 ? `CHICA I ${c.opened ? ' (A)' : ' (C)'}` : `GRANDE II ${c.opened ? ' (A)' : ' (C)'}`}
                                                                </ListGroup.Item>
                                                            )
                                                        }
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    }
                                </ScrollbarsShadow>
                                :
                                <>
                                    {
                                        listDebts.filter(d => String(d._id) !== yearActive).map(debt =>
                                            <Accordion.Item key={`year_${debt._id}`} eventKey={String(debt._id)}>
                                                <Accordion.Header>
                                                    {debt._id}
                                                </Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ListGroup variant='flush'>
                                                        {
                                                            debt.campaigns.map(c =>
                                                                <ListGroup.Item
                                                                    key={`campaign_${c._id}`}
                                                                    onClick={() => dispatch(setActiveCmpIdInUsrNav({ id: tabId, campId: c._id }))}
                                                                    variant='info'
                                                                    action
                                                                >
                                                                    Campaña {c.campaign === 1 ? `CHICA I ${c.opened ? ' (A)' : ' (C)'}` : `GRANDE II ${c.opened ? ' (A)' : ' (C)'}`}
                                                                </ListGroup.Item>
                                                            )
                                                        }
                                                    </ListGroup>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    }
                                </>
                        }
                    </Accordion>
                    :
                    <div className='d-flex p-4 justify-content-center'>
                        EL PREDIO NO TIENE NINGUNA DECLARACION O CAMPAÑA
                    </div>
            }
        </Card>
    )
}
